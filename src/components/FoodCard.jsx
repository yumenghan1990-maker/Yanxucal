// 食物列表卡片
export default function FoodCard({ food, onPress }) {
  return (
    <button
      onClick={onPress}
      className="w-full flex items-center gap-3 px-4 py-3 bg-white hover:bg-primary-50 active:bg-primary-100 transition-colors rounded-xl"
    >
      <div className="w-11 h-11 rounded-xl bg-primary-50 flex items-center justify-center text-2xl flex-shrink-0">
        {food.emoji || '🍽️'}
      </div>
      <div className="flex-1 min-w-0 text-left">
        <p className="font-medium text-gray-800 text-sm truncate">{food.name}</p>
        <p className="text-xs text-gray-400 mt-0.5">
          每100{food.unit} · 碳{food.carbs}g 蛋{food.protein}g 脂{food.fat}g
        </p>
      </div>
      <div className="flex-shrink-0 text-right">
        <span className="text-sm font-bold text-primary-600">{food.calories}</span>
        <span className="text-xs text-gray-400 ml-0.5">kcal</span>
      </div>
    </button>
  )
}
