import { useApp } from '../context/AppContext'
import { Home, Search, BarChart2, User } from 'lucide-react'

const tabs = [
  { id: 'dashboard', label: '首页', Icon: Home },
  { id: 'search', label: '搜索', Icon: Search },
  { id: 'progress', label: '统计', Icon: BarChart2 },
  { id: 'profile', label: '我的', Icon: User },
]

export default function BottomNav() {
  const { state, dispatch, actions } = useApp()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex justify-center">
      <div className="w-full max-w-md bg-white border-t border-gray-100 safe-bottom shadow-lg">
        <div className="flex">
          {tabs.map(({ id, label, Icon }) => {
            const active = state.currentPage === id
            return (
              <button
                key={id}
                onClick={() => dispatch({ type: actions.SET_PAGE, payload: id })}
                className={`flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 transition-colors ${
                  active ? 'text-primary-600' : 'text-gray-400'
                }`}
              >
                <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
                <span className={`text-xs ${active ? 'font-semibold' : 'font-normal'}`}>{label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
