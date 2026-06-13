import { useState, useEffect, useRef } from 'react'
import { Search as SearchIcon, X, Camera, ChevronLeft } from 'lucide-react'
import { useApp, MEAL_NAMES } from '../context/AppContext'
import { searchFoods, FOOD_CATEGORIES } from '../data/foodDatabase'
import FoodCard from '../components/FoodCard'
import FoodDetailModal from '../components/FoodDetailModal'
import CameraModal from '../components/CameraModal'

export default function Search() {
  const { state, dispatch, actions } = useApp()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [selectedFood, setSelectedFood] = useState(null)
  const [showCamera, setShowCamera] = useState(false)
  const inputRef = useRef()

  const results = searchFoods(query, category)

  useEffect(() => {
    // 自动聚焦搜索框
    setTimeout(() => inputRef.current?.focus(), 100)
  }, [])

  function handleBack() {
    dispatch({ type: actions.SET_ADD_FOOD_MODE, payload: false })
    dispatch({ type: actions.SET_PAGE, payload: 'dashboard' })
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* 搜索头部 */}
      <div className="bg-white px-4 pt-12 pb-3 shadow-sm flex-shrink-0">
        {state.addFoodMode && (
          <div className="flex items-center gap-2 mb-2">
            <button onClick={handleBack} className="flex items-center gap-1 text-gray-400 text-sm active:text-gray-600">
              <ChevronLeft size={16} />
              返回
            </button>
            <span className="text-xs text-primary-600 font-medium bg-primary-50 px-2 py-0.5 rounded-full">
              添加到{MEAL_NAMES[state.selectedMealType]}
            </span>
          </div>
        )}

        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2.5">
            <SearchIcon size={16} className="text-gray-400 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="搜索食物，如：鸡胸肉、米饭…"
              className="flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder-gray-400"
            />
            {query && (
              <button onClick={() => setQuery('')}>
                <X size={16} className="text-gray-400" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowCamera(true)}
            className="w-11 h-11 rounded-xl bg-primary-500 flex items-center justify-center flex-shrink-0 active:bg-primary-600"
          >
            <Camera size={18} className="text-white" />
          </button>
        </div>

        {/* 分类筛选 */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mt-3 pb-1">
          {FOOD_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                category === cat.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* 搜索结果 */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {query && (
          <div className="px-4 py-3">
            <span className="text-xs text-gray-400">找到 {results.length} 条结果</span>
          </div>
        )}

        {!query && category === 'all' && (
          <div className="px-4 py-3">
            <span className="text-xs text-gray-400 font-medium">所有食物（{results.length} 种）</span>
          </div>
        )}

        {results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <span className="text-5xl mb-3">🔍</span>
            <p className="text-gray-500 text-sm">没有找到"{query}"</p>
            <p className="text-gray-400 text-xs mt-1">试试搜索其他关键词</p>
          </div>
        ) : (
          <div className="px-3 mt-1 space-y-0.5">
            {results.map(food => (
              <FoodCard
                key={food.id}
                food={food}
                onPress={() => setSelectedFood(food)}
              />
            ))}
          </div>
        )}
      </div>

      {selectedFood && (
        <FoodDetailModal food={selectedFood} onClose={() => setSelectedFood(null)} />
      )}

      {showCamera && (
        <CameraModal onClose={() => setShowCamera(false)} />
      )}
    </div>
  )
}
