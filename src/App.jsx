import { AppProvider, useApp } from './context/AppContext'
import BottomNav from './components/BottomNav'
import Dashboard from './pages/Dashboard'
import Search from './pages/Search'
import Progress from './pages/Progress'
import Profile from './pages/Profile'

function AppContent() {
  const { state } = useApp()

  const pages = {
    dashboard: Dashboard,
    search: Search,
    progress: Progress,
    profile: Profile,
  }

  const CurrentPage = pages[state.currentPage] || Dashboard

  return (
    <div className="h-full flex justify-center bg-gray-100">
      {/* 手机尺寸容器 */}
      <div className="w-full max-w-md h-full bg-gray-50 relative overflow-hidden shadow-2xl">
        {/* 页面内容 */}
        <div className="absolute inset-0 overflow-hidden">
          <CurrentPage key={state.currentPage} />
        </div>

        {/* 底部导航 */}
        <BottomNav />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
