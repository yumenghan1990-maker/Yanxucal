import { useState, useEffect } from 'react'
import { X, Plus, Minus, Check } from 'lucide-react'
import { useApp, MEAL_NAMES } from '../context/AppContext'
import { calcNutrition } from '../data/foodDatabase'

const MEAL_TYPES = ['breakfast', 'lunch', 'dinner', 'snacks']
const MEAL_ICONS = { breakfast: '🌅', lunch: '☀️', dinner: '🌙', snacks: '🍎' }

export default function FoodDetailModal({ food, onClose }) {
  const { state, addFoodEntry } = useApp()
  const [grams, setGrams] = useState(food.serving || 100)
  const [mealType, setMealType] = useState(state.selectedMealType || 'breakfast')
  const [inputVal, setInputVal] = useState(String(food.serving || 100))
  const [added, setAdded] = useState(false)

  const nutrition = calcNutrition(food, grams)

  function handleGramChange(val) {
    const n = parseInt(val, 10)
    setInputVal(val)
    if (!isNaN(n) && n > 0 && n <= 2000) setGrams(n)
  }

  function adjust(delta) {
    const next = Math.max(5, Math.min(2000, grams + delta))
    setGrams(next)
    setInputVal(String(next))
  }

  function handleAdd() {
    addFoodEntry(mealType, {
      name: food.name,
      emoji: food.emoji,
      grams,
      calories: nutrition.calories,
      carbs: nutrition.carbs,
      protein: nutrition.protein,
      fat: nutrition.fat,
    })
    setAdded(true)
    setTimeout(() => {
      onClose()
    }, 700)
  }

  // 防止背景滚动
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* 遮罩 */}
      <div className="absolute inset-0 bg-black/40 animate-fade-in" />

      {/* 底部弹窗 */}
      <div className="relative w-full max-w-md bg-white rounded-t-3xl modal-slide-up overflow-hidden">
        {/* 拖动条 */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-gray-200" />
        </div>

        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
        >
          <X size={16} className="text-gray-500" />
        </button>

        <div className="px-5 pb-6">
          {/* 食物信息 */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center text-3xl">
              {food.emoji || '🍽️'}
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">{food.name}</h2>
              <p className="text-sm text-gray-400">每100{food.unit}</p>
            </div>
          </div>

          {/* 营养数据（大号） */}
          <div className="grid grid-cols-4 gap-2 mb-5">
            <NutritionBig label="热量" value={nutrition.calories} unit="kcal" highlight />
            <NutritionBig label="碳水" value={nutrition.carbs} unit="g" />
            <NutritionBig label="蛋白质" value={nutrition.protein} unit="g" />
            <NutritionBig label="脂肪" value={nutrition.fat} unit="g" />
          </div>

          {/* 克数调节 */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-4">
            <p className="text-xs text-gray-500 mb-3 font-medium">调整份量（克）</p>
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => adjust(-10)}
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm active:scale-95 transition-transform"
              >
                <Minus size={18} className="text-gray-600" />
              </button>
              <div className="flex-1 flex items-center justify-center gap-1">
                <input
                  type="number"
                  value={inputVal}
                  onChange={e => handleGramChange(e.target.value)}
                  className="w-20 text-center text-2xl font-bold text-gray-800 bg-transparent border-b-2 border-primary-400 outline-none py-1"
                  min="5"
                  max="2000"
                />
                <span className="text-gray-400 font-medium">{food.unit}</span>
              </div>
              <button
                onClick={() => adjust(10)}
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm active:scale-95 transition-transform"
              >
                <Plus size={18} className="text-gray-600" />
              </button>
            </div>
            {/* 快捷按钮 */}
            <div className="flex gap-2 mt-3 flex-wrap">
              {[50, 100, 150, 200, 300].map(g => (
                <button
                  key={g}
                  onClick={() => { setGrams(g); setInputVal(String(g)) }}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    grams === g
                      ? 'bg-primary-500 text-white'
                      : 'bg-white text-gray-500 border border-gray-200'
                  }`}
                >
                  {g}g
                </button>
              ))}
              {food.serving && food.serving !== 100 && (
                <button
                  onClick={() => { setGrams(food.serving); setInputVal(String(food.serving)) }}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    grams === food.serving
                      ? 'bg-primary-500 text-white'
                      : 'bg-primary-50 text-primary-600 border border-primary-200'
                  }`}
                >
                  {food.servingLabel}
                </button>
              )}
            </div>
          </div>

          {/* 餐食选择 */}
          <div className="mb-5">
            <p className="text-xs text-gray-500 mb-2 font-medium">添加到</p>
            <div className="grid grid-cols-4 gap-2">
              {MEAL_TYPES.map(type => (
                <button
                  key={type}
                  onClick={() => setMealType(type)}
                  className={`flex flex-col items-center justify-center py-2 rounded-xl text-xs font-medium transition-all ${
                    mealType === type
                      ? 'bg-primary-500 text-white shadow-sm'
                      : 'bg-gray-50 text-gray-500'
                  }`}
                >
                  <span className="text-base mb-0.5">{MEAL_ICONS[type]}</span>
                  {MEAL_NAMES[type]}
                </button>
              ))}
            </div>
          </div>

          {/* 添加按钮 */}
          <button
            onClick={handleAdd}
            disabled={added}
            className={`w-full py-3.5 rounded-2xl font-semibold text-base transition-all ${
              added
                ? 'bg-primary-500 text-white'
                : 'bg-primary-500 hover:bg-primary-600 active:scale-[0.98] text-white shadow-lg shadow-primary-200'
            }`}
          >
            {added ? (
              <span className="flex items-center justify-center gap-2">
                <Check size={18} /> 已添加！
              </span>
            ) : (
              `添加 ${nutrition.calories} kcal 到${MEAL_NAMES[mealType]}`
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

function NutritionBig({ label, value, unit, highlight }) {
  return (
    <div className={`rounded-xl p-2.5 text-center ${highlight ? 'bg-primary-50' : 'bg-gray-50'}`}>
      <div className={`text-base font-bold ${highlight ? 'text-primary-600' : 'text-gray-700'}`}>
        {typeof value === 'number' ? value : '—'}
      </div>
      <div className={`text-xs ${highlight ? 'text-primary-500' : 'text-gray-400'}`}>{unit}</div>
      <div className="text-xs text-gray-400 mt-0.5">{label}</div>
    </div>
  )
}
