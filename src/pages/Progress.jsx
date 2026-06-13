import { useMemo } from 'react'
import { TrendingUp, Flame, Award } from 'lucide-react'
import { useApp, formatDate } from '../context/AppContext'

function getLast7Days() {
  const days = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push(d)
  }
  return days
}

const DAY_LABELS = ['日', '一', '二', '三', '四', '五', '六']

export default function Progress() {
  const { state, getDayTotals } = useApp()
  const goal = state.settings.dailyGoal || 1200
  const last7 = useMemo(getLast7Days, [])

  const weekData = last7.map(d => {
    const str = formatDate(d)
    const totals = getDayTotals(str)
    return {
      date: str,
      day: DAY_LABELS[d.getDay()],
      dateNum: d.getDate(),
      calories: totals.calories,
      carbs: totals.carbs,
      protein: totals.protein,
      fat: totals.fat,
    }
  })

  const maxCal = Math.max(...weekData.map(d => d.calories), goal)
  const todayStr = formatDate(new Date())
  const todayData = weekData.find(d => d.date === todayStr)
  const totalThisWeek = weekData.reduce((s, d) => s + d.calories, 0)
  const avgCalories = Math.round(totalThisWeek / 7)

  // 连续打卡天数（有记录就算）
  let streak = 0
  for (let i = last7.length - 1; i >= 0; i--) {
    if (weekData[i].calories > 0) streak++
    else break
  }

  // 今日宏量分布（饼图用角度）
  const today = getDayTotals(todayStr)
  const totalMacroKcal = today.carbs * 4 + today.protein * 4 + today.fat * 9
  const carbPct = totalMacroKcal > 0 ? Math.round(today.carbs * 4 / totalMacroKcal * 100) : 33
  const proteinPct = totalMacroKcal > 0 ? Math.round(today.protein * 4 / totalMacroKcal * 100) : 33
  const fatPct = totalMacroKcal > 0 ? (100 - carbPct - proteinPct) : 34

  return (
    <div className="h-full overflow-y-auto no-scrollbar pb-24">
      {/* 顶部 */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-600 px-5 pt-12 pb-6">
        <h1 className="text-xl font-bold text-white mb-1">数据统计</h1>
        <p className="text-white/70 text-sm">近 7 天热量趋势</p>
      </div>

      <div className="px-4 -mt-2 space-y-4 pb-4">
        {/* 统计卡片 */}
        <div className="grid grid-cols-3 gap-3">
          <StatCard
            icon={<Flame size={18} className="text-orange-500" />}
            label="今日热量"
            value={todayData?.calories || 0}
            unit="kcal"
            sub={`目标 ${goal}`}
            color="orange"
          />
          <StatCard
            icon={<TrendingUp size={18} className="text-blue-500" />}
            label="周均热量"
            value={avgCalories}
            unit="kcal"
            sub="最近7天"
            color="blue"
          />
          <StatCard
            icon={<Award size={18} className="text-yellow-500" />}
            label="连续打卡"
            value={streak}
            unit="天"
            sub="坚持就是胜利"
            color="yellow"
          />
        </div>

        {/* 热量柱状图 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">近 7 天热量（kcal）</h3>
          <div className="flex items-end justify-between gap-1.5 h-36">
            {weekData.map(d => {
              const height = maxCal > 0 ? (d.calories / maxCal) * 100 : 0
              const isToday = d.date === todayStr
              const overGoal = d.calories > goal

              return (
                <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
                  {d.calories > 0 && (
                    <span className="text-xs text-gray-400 leading-none">{d.calories}</span>
                  )}
                  <div className="w-full flex flex-col justify-end" style={{ height: '100px' }}>
                    <div
                      className={`w-full rounded-t-lg transition-all duration-700 ${
                        isToday
                          ? overGoal ? 'bg-red-400' : 'bg-primary-500'
                          : overGoal ? 'bg-red-200' : 'bg-primary-200'
                      }`}
                      style={{ height: `${Math.max(height, d.calories > 0 ? 4 : 0)}%` }}
                    />
                  </div>
                  <span className={`text-xs ${isToday ? 'text-primary-600 font-bold' : 'text-gray-400'}`}>
                    {isToday ? '今' : d.day}
                  </span>
                  <span className="text-xs text-gray-300">{d.dateNum}</span>
                </div>
              )
            })}
          </div>
          {/* 目标线标注 */}
          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-50">
            <div className="w-6 h-0.5 bg-gray-300 border-dashed border-t border-gray-400" />
            <span className="text-xs text-gray-400">目标 {goal} kcal</span>
            <div className="flex items-center gap-1 ml-auto">
              <div className="w-3 h-3 rounded-sm bg-primary-500" />
              <span className="text-xs text-gray-400">达标</span>
              <div className="w-3 h-3 rounded-sm bg-red-400 ml-2" />
              <span className="text-xs text-gray-400">超标</span>
            </div>
          </div>
        </div>

        {/* 今日宏量分布 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">今日宏量分布</h3>
          {totalMacroKcal === 0 ? (
            <p className="text-sm text-gray-400 text-center py-4">今天还没有记录，快去添加食物吧 🍽️</p>
          ) : (
            <>
              <MacroBar label="碳水化合物" value={today.carbs} unit="g" kcal={Math.round(today.carbs * 4)} pct={carbPct} color="#f97316" />
              <MacroBar label="蛋白质" value={today.protein} unit="g" kcal={Math.round(today.protein * 4)} pct={proteinPct} color="#3b82f6" />
              <MacroBar label="脂肪" value={today.fat} unit="g" kcal={Math.round(today.fat * 9)} pct={fatPct} color="#eab308" />
              <div className="mt-3 pt-3 border-t border-gray-50">
                <p className="text-xs text-gray-400 text-center">总热量来源：{totalMacroKcal} kcal</p>
              </div>
            </>
          )}
        </div>

        {/* 本周每天详情 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">本周每日详情</h3>
          <div className="space-y-2">
            {[...weekData].reverse().map(d => {
              const isToday = d.date === todayStr
              const overGoal = d.calories > goal
              return (
                <div key={d.date} className={`flex items-center gap-3 p-2 rounded-xl ${isToday ? 'bg-primary-50' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    isToday ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {isToday ? '今' : d.day}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">{d.date.slice(5)}</span>
                      <span className={`text-xs font-semibold ${overGoal ? 'text-red-500' : d.calories > 0 ? 'text-primary-600' : 'text-gray-300'}`}>
                        {d.calories > 0 ? `${d.calories} kcal` : '无记录'}
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${overGoal ? 'bg-red-400' : 'bg-primary-400'}`}
                        style={{ width: `${Math.min((d.calories / goal) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, unit, sub, color }) {
  const colors = {
    orange: 'bg-orange-50',
    blue: 'bg-blue-50',
    yellow: 'bg-yellow-50',
  }
  return (
    <div className={`${colors[color]} rounded-2xl p-3`}>
      <div className="mb-2">{icon}</div>
      <div className="text-xl font-bold text-gray-700">{value}</div>
      <div className="text-xs text-gray-400">{unit}</div>
      <div className="text-xs font-medium text-gray-600 mt-1">{label}</div>
      <div className="text-xs text-gray-400 mt-0.5 leading-tight">{sub}</div>
    </div>
  )
}

function MacroBar({ label, value, unit, kcal, pct, color }) {
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-600 font-medium">{label}</span>
        <span className="text-xs text-gray-400">{value.toFixed(1)}{unit} · {kcal} kcal · {pct}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}
