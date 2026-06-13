import { useState, useMemo } from 'react'
import { Bell, Camera } from 'lucide-react'
import { useApp, formatDate } from '../context/AppContext'
import CircularProgress from '../components/CircularProgress'
import MacroCard from '../components/MacroCard'
import MealSection from '../components/MealSection'
import CameraModal from '../components/CameraModal'

const DAILY_MACRO_GOALS = { carbs: 150, protein: 60, fat: 40 }

function getGreeting() {
  const h = new Date().getHours()
  if (h < 6) return '夜深了'
  if (h < 10) return '早上好'
  if (h < 12) return '上午好'
  if (h < 14) return '中午好'
  if (h < 18) return '下午好'
  return '晚上好'
}

function buildWeekDates() {
  const today = new Date()
  const days = []
  for (let i = -3; i <= 3; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    days.push(d)
  }
  return days
}

const DAY_NAMES = ['日', '一', '二', '三', '四', '五', '六']

export default function Dashboard() {
  const { state, dispatch, actions, getDayTotals } = useApp()
  const [showCamera, setShowCamera] = useState(false)
  const weekDates = useMemo(buildWeekDates, [])
  const todayStr = formatDate(new Date())

  const totals = getDayTotals(state.currentDate)
  const goal = state.settings.dailyGoal || 1200
  const { userName, userAvatar } = state.settings

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {/* 顶部区域 */}
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 px-5 pt-12 pb-8">
          {/* 头部 */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 overflow-hidden flex items-center justify-center">
                {userAvatar ? (
                  <img src={userAvatar} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-white font-bold text-base">
                    {userName?.charAt(0)?.toUpperCase() || 'Y'}
                  </span>
                )}
              </div>
              <div>
                <p className="text-white/80 text-xs">{getGreeting()}，</p>
                <p className="text-white font-semibold text-sm">{userName || 'Yanxu'}</p>
              </div>
            </div>
            <button
              onClick={() => setShowCamera(true)}
              className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center active:bg-white/30"
            >
              <Camera size={18} className="text-white" />
            </button>
          </div>

          {/* 日期选择器 */}
          <div className="flex gap-1 overflow-x-auto no-scrollbar mb-6">
            {weekDates.map(d => {
              const str = formatDate(d)
              const isSelected = str === state.currentDate
              const isToday = str === todayStr
              return (
                <button
                  key={str}
                  onClick={() => dispatch({ type: actions.SET_DATE, payload: str })}
                  className={`flex-shrink-0 flex flex-col items-center px-3 py-2 rounded-xl transition-all ${
                    isSelected
                      ? 'bg-white text-primary-600'
                      : 'text-white/70 hover:bg-white/10'
                  }`}
                >
                  <span className="text-xs font-medium">
                    {isToday && !isSelected ? '今' : DAY_NAMES[d.getDay()]}
                  </span>
                  <span className={`text-base font-bold mt-0.5 ${isSelected ? 'text-primary-600' : ''}`}>
                    {d.getDate()}
                  </span>
                  {isToday && (
                    <div className={`w-1.5 h-1.5 rounded-full mt-1 ${isSelected ? 'bg-primary-400' : 'bg-white/60'}`} />
                  )}
                </button>
              )
            })}
          </div>

          {/* 圆形进度 */}
          <div className="flex justify-center">
            <CircularProgress consumed={totals.calories} goal={goal} size={200} />
          </div>

          {/* 目标说明 */}
          <p className="text-center text-white/70 text-xs mt-3">
            每日目标 {goal} kcal
          </p>
        </div>

        {/* 宏量营养素卡片 */}
        <div className="px-4 -mt-4">
          <div className="bg-white rounded-2xl shadow-sm p-4">
            <div className="flex gap-2">
              <MacroCard
                label="碳水"
                current={totals.carbs}
                goal={DAILY_MACRO_GOALS.carbs}
                color="orange"
              />
              <MacroCard
                label="蛋白质"
                current={totals.protein}
                goal={DAILY_MACRO_GOALS.protein}
                color="blue"
              />
              <MacroCard
                label="脂肪"
                current={totals.fat}
                goal={DAILY_MACRO_GOALS.fat}
                color="yellow"
              />
            </div>
          </div>
        </div>

        {/* 餐食记录 */}
        <div className="px-4 mt-4 space-y-3">
          <MealSection mealType="breakfast" date={state.currentDate} />
          <MealSection mealType="lunch" date={state.currentDate} />
          <MealSection mealType="dinner" date={state.currentDate} />
          <MealSection mealType="snacks" date={state.currentDate} />
        </div>
      </div>

      {showCamera && <CameraModal onClose={() => setShowCamera(false)} />}
    </div>
  )
}
