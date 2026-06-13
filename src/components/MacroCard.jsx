// 宏量营养素卡片
export default function MacroCard({ label, current, goal, unit = 'g', color }) {
  const ratio = Math.min(current / goal, 1)
  const percentage = Math.round(ratio * 100)

  const colors = {
    orange: { bg: 'bg-orange-50', bar: 'bg-orange-400', text: 'text-orange-600', light: 'bg-orange-100' },
    blue: { bg: 'bg-blue-50', bar: 'bg-blue-400', text: 'text-blue-600', light: 'bg-blue-100' },
    yellow: { bg: 'bg-yellow-50', bar: 'bg-yellow-400', text: 'text-yellow-600', light: 'bg-yellow-100' },
  }
  const c = colors[color] || colors.blue

  return (
    <div className={`rounded-2xl p-3 ${c.bg} flex-1`}>
      <div className="flex items-center justify-between mb-1.5">
        <span className={`text-xs font-medium ${c.text}`}>{label}</span>
        <span className="text-xs text-gray-400">{percentage}%</span>
      </div>
      <div className="text-base font-bold text-gray-700">
        {current.toFixed(1)}<span className="text-xs font-normal text-gray-400 ml-0.5">{unit}</span>
      </div>
      <div className="text-xs text-gray-400 mb-2">/ {goal}{unit}</div>
      {/* 进度条 */}
      <div className={`h-1.5 rounded-full ${c.light} overflow-hidden`}>
        <div
          className={`h-full rounded-full ${c.bar} transition-all duration-700`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
