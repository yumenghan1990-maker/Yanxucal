import { useState, useRef, useEffect } from 'react'
import { X, Camera, ImagePlus, Loader, Check, AlertCircle, Plus, Minus } from 'lucide-react'
import { useApp, MEAL_NAMES } from '../context/AppContext'
import { analyzeImage, compressImage } from '../utils/visionApi'

const MEAL_TYPES = ['breakfast', 'lunch', 'dinner', 'snacks']
const MEAL_ICONS = { breakfast: '🌅', lunch: '☀️', dinner: '🌙', snacks: '🍎' }

export default function CameraModal({ onClose }) {
  const { state, addFoodEntry } = useApp()
  const [phase, setPhase] = useState('input') // input | loading | result | manual
  const [imageBase64, setImageBase64] = useState(null)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [mealType, setMealType] = useState(state.selectedMealType || 'breakfast')
  const [manualGrams, setManualGrams] = useState(100)
  const [addedItems, setAddedItems] = useState({}) // id -> true
  const cameraRef = useRef()
  const galleryRef = useRef()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  async function handleFile(file) {
    if (!file) return
    try {
      const compressed = await compressImage(file, 1024, 0.8)
      setImageBase64(compressed)
      setPhase('loading')
      setError(null)

      const res = await analyzeImage(compressed, state.settings.apiKey)
      setResult(res)

      if (res.type === 'label' && res.label?.needsManualInput) {
        setPhase('manual')
      } else {
        setPhase('result')
      }
    } catch (e) {
      setError(e.message || '识别失败，请重试')
      setPhase('input')
    }
  }

  function addItem(item, grams) {
    const ratio = grams / 100
    addFoodEntry(mealType, {
      name: item.name,
      emoji: item.emoji || '📷',
      grams,
      calories: Math.round(item.caloriesPer100g * ratio),
      carbs: Math.round(item.carbsPer100g * ratio * 10) / 10,
      protein: Math.round(item.proteinPer100g * ratio * 10) / 10,
      fat: Math.round(item.fatPer100g * ratio * 10) / 10,
    })
    setAddedItems(prev => ({ ...prev, [item.name]: true }))
  }

  function addLabelItem() {
    const { label } = result
    const ratio = manualGrams / 100
    addFoodEntry(mealType, {
      name: '包装食品（营养成分表）',
      emoji: '📦',
      grams: manualGrams,
      calories: Math.round(label.caloriesPer100g * ratio),
      carbs: Math.round(label.carbsPer100g * ratio * 10) / 10,
      protein: Math.round(label.proteinPer100g * ratio * 10) / 10,
      fat: Math.round(label.fatPer100g * ratio * 10) / 10,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="absolute inset-0 bg-black/50 animate-fade-in" />

      <div className="relative w-full max-w-md bg-white rounded-t-3xl modal-slide-up overflow-hidden max-h-[90vh] flex flex-col">
        {/* 头部 */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Camera size={20} className="text-primary-600" />
            <h2 className="text-base font-bold text-gray-800">拍照识别食物</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-5 pb-6">
          {/* 输入阶段 */}
          {phase === 'input' && (
            <>
              {error && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-xl p-3 mb-4">
                  <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* 图片预览 */}
              {imageBase64 && (
                <div className="mb-4 rounded-2xl overflow-hidden">
                  <img src={imageBase64} alt="preview" className="w-full h-48 object-cover" />
                </div>
              )}

              {/* 上传按钮 */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  onClick={() => cameraRef.current?.click()}
                  className="flex flex-col items-center justify-center gap-2 py-6 bg-primary-50 rounded-2xl border-2 border-dashed border-primary-200 active:bg-primary-100"
                >
                  <Camera size={28} className="text-primary-500" />
                  <span className="text-sm font-medium text-primary-600">拍照</span>
                </button>
                <button
                  onClick={() => galleryRef.current?.click()}
                  className="flex flex-col items-center justify-center gap-2 py-6 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 active:bg-gray-100"
                >
                  <ImagePlus size={28} className="text-gray-500" />
                  <span className="text-sm font-medium text-gray-600">从相册选择</span>
                </button>
              </div>

              <p className="text-xs text-gray-400 text-center leading-relaxed">
                支持识别餐盘照片 🍽️ 和食品包装营养成分表 📦
              </p>

              <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={e => handleFile(e.target.files[0])} />
              <input ref={galleryRef} type="file" accept="image/*" className="hidden" onChange={e => handleFile(e.target.files[0])} />
            </>
          )}

          {/* 加载中 */}
          {phase === 'loading' && (
            <div className="flex flex-col items-center justify-center py-12 gap-4">
              {imageBase64 && (
                <div className="w-32 h-32 rounded-2xl overflow-hidden mb-2">
                  <img src={imageBase64} alt="preview" className="w-full h-full object-cover" />
                </div>
              )}
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                <Loader size={22} className="text-primary-600 animate-spin" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-gray-700">AI 正在识别中…</p>
                <p className="text-xs text-gray-400 mt-1">通常需要 3-8 秒</p>
              </div>
            </div>
          )}

          {/* 识别结果 */}
          {phase === 'result' && result && (
            <>
              {imageBase64 && (
                <div className="mb-4 rounded-2xl overflow-hidden">
                  <img src={imageBase64} alt="preview" className="w-full h-36 object-cover" />
                </div>
              )}

              <div className="mb-3 flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-700">识别结果</span>
                <span className="text-xs text-gray-400">{result.description}</span>
              </div>

              {/* 食物列表 */}
              {result.type === 'food' && result.items && (
                <div className="space-y-2 mb-4">
                  {result.items.map((item, idx) => (
                    <RecognizedFoodRow
                      key={idx}
                      item={item}
                      added={addedItems[item.name]}
                      onAdd={grams => addItem(item, grams)}
                    />
                  ))}
                </div>
              )}

              {/* 营养成分表结果 */}
              {result.type === 'label' && result.label && (
                <LabelResult label={result.label} manualGrams={manualGrams} setManualGrams={setManualGrams} />
              )}

              {/* 餐食选择 */}
              <MealSelector mealType={mealType} setMealType={setMealType} />

              {result.type === 'label' && (
                <button
                  onClick={addLabelItem}
                  className="w-full py-3.5 mt-3 bg-primary-500 text-white rounded-2xl font-semibold active:bg-primary-600"
                >
                  添加到{MEAL_NAMES[mealType]}
                </button>
              )}

              <button
                onClick={() => { setPhase('input'); setError(null) }}
                className="w-full py-2.5 mt-2 text-gray-500 text-sm"
              >
                重新识别
              </button>
            </>
          )}

          {/* 手动输入净含量 */}
          {phase === 'manual' && result?.label && (
            <>
              <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-3 mb-4">
                <p className="text-sm text-yellow-700 font-medium mb-1">⚠️ 无法读取净含量</p>
                <p className="text-xs text-yellow-600">已识别到营养成分表，请手动输入您实际吃了多少克</p>
              </div>

              <LabelResult label={result.label} manualGrams={manualGrams} setManualGrams={setManualGrams} />

              <MealSelector mealType={mealType} setMealType={setMealType} />

              <button
                onClick={addLabelItem}
                className="w-full py-3.5 mt-4 bg-primary-500 text-white rounded-2xl font-semibold"
              >
                添加到{MEAL_NAMES[mealType]}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function RecognizedFoodRow({ item, added, onAdd }) {
  const [grams, setGrams] = useState(item.estimatedGrams || 100)

  return (
    <div className="bg-gray-50 rounded-xl p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">{item.name}</span>
        <span className="text-sm font-bold text-primary-600">
          {Math.round(item.caloriesPer100g * grams / 100)} kcal
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => setGrams(g => Math.max(10, g - 10))} className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center">
          <Minus size={12} className="text-gray-500" />
        </button>
        <span className="flex-1 text-center text-sm font-medium text-gray-600">{grams}g</span>
        <button onClick={() => setGrams(g => Math.min(1000, g + 10))} className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center">
          <Plus size={12} className="text-gray-500" />
        </button>
        <button
          onClick={() => onAdd(grams)}
          disabled={added}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            added ? 'bg-primary-500 text-white' : 'bg-primary-500 text-white active:bg-primary-600'
          }`}
        >
          {added ? <Check size={14} /> : '添加'}
        </button>
      </div>
    </div>
  )
}

function LabelResult({ label, manualGrams, setManualGrams }) {
  const ratio = manualGrams / 100
  return (
    <div className="bg-gray-50 rounded-xl p-4 mb-4">
      <p className="text-xs font-semibold text-gray-500 uppercase mb-3">营养成分表（每100g/ml）</p>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {[
          { label: '热量', value: label.caloriesPer100g, unit: 'kcal' },
          { label: '碳水', value: label.carbsPer100g, unit: 'g' },
          { label: '蛋白质', value: label.proteinPer100g, unit: 'g' },
          { label: '脂肪', value: label.fatPer100g, unit: 'g' },
        ].map(n => (
          <div key={n.label} className="bg-white rounded-lg p-2 text-center">
            <div className="text-sm font-bold text-gray-700">{n.value}</div>
            <div className="text-xs text-gray-400">{n.unit}</div>
            <div className="text-xs text-gray-400">{n.label}</div>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-500 mb-2 font-medium">实际吃了多少克？</p>
      <div className="flex items-center gap-3">
        <button onClick={() => setManualGrams(g => Math.max(10, g - 10))} className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center">
          <Minus size={14} className="text-gray-600" />
        </button>
        <div className="flex-1 bg-white rounded-xl py-2 px-3 flex items-center justify-center gap-1 border border-gray-200">
          <input
            type="number"
            value={manualGrams}
            onChange={e => setManualGrams(Math.max(10, Math.min(2000, parseInt(e.target.value) || 10)))}
            className="w-16 text-center text-xl font-bold text-gray-800 outline-none bg-transparent"
          />
          <span className="text-gray-400 text-sm">g</span>
        </div>
        <button onClick={() => setManualGrams(g => Math.min(2000, g + 10))} className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center">
          <Plus size={14} className="text-gray-600" />
        </button>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500 mb-1">实际摄入（{manualGrams}g）</p>
        <div className="flex gap-4">
          <span className="text-sm font-bold text-primary-600">{Math.round(label.caloriesPer100g * ratio)} kcal</span>
          <span className="text-xs text-gray-400">碳{(label.carbsPer100g * ratio).toFixed(1)}g</span>
          <span className="text-xs text-gray-400">蛋{(label.proteinPer100g * ratio).toFixed(1)}g</span>
          <span className="text-xs text-gray-400">脂{(label.fatPer100g * ratio).toFixed(1)}g</span>
        </div>
      </div>
    </div>
  )
}

function MealSelector({ mealType, setMealType }) {
  return (
    <div className="mb-2">
      <p className="text-xs text-gray-500 mb-2 font-medium">添加到哪餐</p>
      <div className="grid grid-cols-4 gap-2">
        {MEAL_TYPES.map(type => (
          <button
            key={type}
            onClick={() => setMealType(type)}
            className={`flex flex-col items-center py-2 rounded-xl text-xs font-medium transition-all ${
              mealType === type ? 'bg-primary-500 text-white' : 'bg-gray-50 text-gray-500'
            }`}
          >
            <span className="text-base mb-0.5">{MEAL_ICONS[type]}</span>
            {MEAL_NAMES[type]}
          </button>
        ))}
      </div>
    </div>
  )
}
