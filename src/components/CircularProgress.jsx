// 圆形进度环
export default function CircularProgress({ consumed, goal, size = 200 }) {
  const radius = (size - 20) / 2
  const circumference = 2 * Math.PI * radius
  const ratio = Math.min(consumed / goal, 1)
  const offset = circumference - ratio * circumference
  const remaining = Math.max(goal - consumed, 0)
  const overGoal = consumed > goal

  const strokeColor = overGoal ? '#ef4444' : '#22c55e'
  const centerX = size / 2
  const centerY = size / 2

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute inset-0">
        {/* 背景轨道 */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke="#dcfce7"
          strokeWidth="12"
        />
        {/* 进度弧 */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: 'center',
            transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
      </svg>

      {/* 中心文字 */}
      <div className="flex flex-col items-center justify-center z-10">
        <span className="text-3xl font-bold text-gray-800">{consumed}</span>
        <span className="text-xs text-gray-500 mt-0.5">已摄入 kcal</span>
        <div className="mt-2 flex items-center gap-1">
          {overGoal ? (
            <span className="text-xs font-medium text-red-500">超出 {consumed - goal} kcal</span>
          ) : (
            <span className="text-xs font-medium text-primary-600">还剩 {remaining} kcal</span>
          )}
        </div>
      </div>
    </div>
  )
}
