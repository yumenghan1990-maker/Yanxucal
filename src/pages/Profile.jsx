import { useState, useRef } from 'react'
import { User, Key, Target, ChevronRight, Eye, EyeOff, Camera, Trash2, Info } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function Profile() {
  const { state, dispatch, actions } = useApp()
  const { settings } = state
  const [showApiKey, setShowApiKey] = useState(false)
  const [editName, setEditName] = useState(false)
  const [nameVal, setNameVal] = useState(settings.userName || 'Yanxu')
  const [apiKeyVal, setApiKeyVal] = useState(settings.apiKey || '')
  const [goalVal, setGoalVal] = useState(String(settings.dailyGoal || 1200))
  const avatarInputRef = useRef()

  function saveSettings(partial) {
    dispatch({ type: actions.UPDATE_SETTINGS, payload: partial })
  }

  function handleAvatarChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => saveSettings({ userAvatar: reader.result })
    reader.readAsDataURL(file)
  }

  function handleClearData() {
    if (window.confirm('确定要清除所有饮食记录吗？此操作不可撤销。')) {
      dispatch({ type: 'LOAD_STATE', payload: { meals: {} } })
    }
  }

  return (
    <div className="h-full overflow-y-auto no-scrollbar pb-24">
      {/* 头部背景 */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-600 px-5 pt-12 pb-16">
        <h1 className="text-xl font-bold text-white">个人资料</h1>
      </div>

      {/* 头像卡片 */}
      <div className="px-4 -mt-10 mb-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="relative">
            <div
              onClick={() => avatarInputRef.current?.click()}
              className="w-16 h-16 rounded-full bg-primary-100 overflow-hidden flex items-center justify-center cursor-pointer border-2 border-primary-200"
            >
              {settings.userAvatar ? (
                <img src={settings.userAvatar} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl font-bold text-primary-500">
                  {settings.userName?.charAt(0)?.toUpperCase() || 'Y'}
                </span>
              )}
            </div>
            <div
              onClick={() => avatarInputRef.current?.click()}
              className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center cursor-pointer"
            >
              <Camera size={11} className="text-white" />
            </div>
            <input ref={avatarInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          </div>

          <div className="flex-1">
            {editName ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={nameVal}
                  onChange={e => setNameVal(e.target.value)}
                  onBlur={() => { saveSettings({ userName: nameVal || 'Yanxu' }); setEditName(false) }}
                  onKeyDown={e => e.key === 'Enter' && e.target.blur()}
                  autoFocus
                  className="flex-1 border-b-2 border-primary-400 text-lg font-bold text-gray-800 outline-none pb-0.5"
                />
              </div>
            ) : (
              <button onClick={() => setEditName(true)} className="flex items-center gap-1 text-left">
                <span className="text-lg font-bold text-gray-800">{settings.userName || 'Yanxu'}</span>
                <ChevronRight size={16} className="text-gray-300" />
              </button>
            )}
            <p className="text-sm text-gray-400 mt-0.5">点击名字可编辑</p>
          </div>
        </div>
      </div>

      <div className="px-4 space-y-4">
        {/* 每日目标设置 */}
        <SettingCard icon={<Target size={18} className="text-primary-500" />} title="每日卡路里目标">
          <div className="mt-3">
            <div className="flex items-center gap-3">
              {[1000, 1200, 1500, 1800, 2000].map(g => (
                <button
                  key={g}
                  onClick={() => { setGoalVal(String(g)); saveSettings({ dailyGoal: g }) }}
                  className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
                    settings.dailyGoal === g
                      ? 'bg-primary-500 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-sm text-gray-500">自定义：</span>
              <input
                type="number"
                value={goalVal}
                onChange={e => setGoalVal(e.target.value)}
                onBlur={() => {
                  const v = parseInt(goalVal)
                  if (v >= 500 && v <= 5000) saveSettings({ dailyGoal: v })
                  else setGoalVal(String(settings.dailyGoal))
                }}
                className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-700 outline-none focus:border-primary-400"
                min="500"
                max="5000"
              />
              <span className="text-sm text-gray-400">kcal</span>
            </div>
          </div>
        </SettingCard>

        {/* API Key 设置 */}
        <SettingCard icon={<Key size={18} className="text-primary-500" />} title="Qwen API Key">
          <div className="mt-3">
            <div className="bg-blue-50 rounded-xl p-3 mb-3 flex items-start gap-2">
              <Info size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-blue-600 leading-relaxed">
                用于拍照识别功能。前往
                <span className="font-medium"> console.anthropic.com → API Keys </span>
                获取 Claude API Key。Key 仅存储在本地。
              </p>
            </div>
            <div className="relative">
              <input
                type={showApiKey ? 'text' : 'password'}
                value={apiKeyVal}
                onChange={e => setApiKeyVal(e.target.value)}
                onBlur={() => saveSettings({ apiKey: apiKeyVal })}
                placeholder="sk-xxxxxxxxxxxxxxxx"
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 pr-10 text-sm text-gray-700 outline-none focus:border-primary-400 font-mono"
              />
              <button
                onClick={() => setShowApiKey(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showApiKey
                  ? <EyeOff size={16} className="text-gray-400" />
                  : <Eye size={16} className="text-gray-400" />
                }
              </button>
            </div>
            {apiKeyVal && (
              <p className="text-xs text-primary-600 mt-1.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
                API Key 已设置
              </p>
            )}
          </div>
        </SettingCard>

        {/* 关于 */}
        <SettingCard icon={<Info size={18} className="text-primary-500" />} title="关于 YanxuCal">
          <div className="mt-3 space-y-2">
            <InfoRow label="版本" value="1.0.0" />
            <InfoRow label="AI 模型" value="Claude Opus 4" />
            <InfoRow label="每日目标" value={`${settings.dailyGoal || 1200} kcal`} />
            <InfoRow label="食物数据库" value="167 种食物" />
          </div>
        </SettingCard>

        {/* 危险操作 */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
          <button
            onClick={handleClearData}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-red-500 active:bg-red-50"
          >
            <Trash2 size={18} />
            <span className="text-sm font-medium">清除所有饮食记录</span>
          </button>
        </div>

        <p className="text-center text-xs text-gray-300 pb-2">
          YanxuCal · 让每一卡都有意义
        </p>
      </div>
    </div>
  )
}

function SettingCard({ icon, title, children }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
      </div>
      {children}
    </div>
  )
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm text-gray-600 font-medium">{value}</span>
    </div>
  )
}
