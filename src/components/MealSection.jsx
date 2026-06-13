import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { useApp, MEAL_NAMES } from '../context/AppContext'

const MEAL_ICONS = {
  breakfast: '🌅',
  lunch: '☀️',
  dinner: '🌙',
  snacks: '🍎',
}

export default function MealSection({ mealType, date }) {
  const { getDayMeals, removeFoodEntry, getMealTotals, startAddFood } = useApp()
  const [collapsed, setCollapsed] = useState(false)

  const meals = getDayMeals(date)
  const entries = meals[mealType] || []
  const totals = getMealTotals(date, mealType)

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      {/* 标题行 */}
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer"
        onClick={() => setCollapsed(v => !v)}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{MEAL_ICONS[mealType]}</span>
          <span className="font-semibold text-gray-700">{MEAL_NAMES[mealType]}</span>
          {entries.length > 0 && (
            <span className="text-xs text-gray-400">{entries.length} 项</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {entries.length > 0 && (
            <span className="text-sm font-semibold text-primary-600">{totals.calories} kcal</span>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); startAddFood(mealType) }}
            className="w-7 h-7 rounded-full bg-primary-500 flex items-center justify-center text-white shadow-sm active:scale-95 transition-transform"
          >
            <Plus size={16} strokeWidth={2.5} />
          </button>
          {collapsed
            ? <ChevronDown size={16} className="text-gray-400" />
            : <ChevronUp size={16} className="text-gray-400" />
          }
        </div>
      </div>

      {/* 条目列表 */}
      {!collapsed && (
        <>
          {entries.length === 0 ? (
            <div
              className="px-4 pb-3 text-sm text-gray-400 cursor-pointer"
              onClick={() => startAddFood(mealType)}
            >
              点击 + 添加{MEAL_NAMES[mealType]}
            </div>
          ) : (
            <div className="border-t border-gray-50">
              {entries.map((entry) => (
                <FoodEntry
                  key={entry.id}
                  entry={entry}
                  onRemove={() => removeFoodEntry(date, mealType, entry.id)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

function FoodEntry({ entry, onRemove }) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-2.5 flex-1 min-w-0">
        <span className="text-lg flex-shrink-0">{entry.emoji || '🍽️'}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-700 truncate">{entry.name}</p>
          <p className="text-xs text-gray-400">{entry.grams}g · 碳{entry.carbs.toFixed(1)} 蛋{entry.protein.toFixed(1)} 脂{entry.fat.toFixed(1)}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-sm font-semibold text-gray-600">{entry.calories} kcal</span>
        <button
          onClick={onRemove}
          className="p-1 text-gray-300 hover:text-red-400 transition-colors"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  )
}
