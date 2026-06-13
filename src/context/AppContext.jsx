import { createContext, useContext, useReducer, useEffect } from 'react'

// 格式化日期为 YYYY-MM-DD
export function formatDate(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function todayStr() {
  return formatDate(new Date())
}

// 空的餐食模板
function emptyMeals() {
  return { breakfast: [], lunch: [], dinner: [], snacks: [] }
}

const MEAL_NAMES = { breakfast: '早餐', lunch: '午餐', dinner: '晚餐', snacks: '零食' }
export { MEAL_NAMES }

// 初始状态
const initialState = {
  currentPage: 'dashboard',
  currentDate: todayStr(),
  meals: {},         // { 'YYYY-MM-DD': { breakfast: [], ... } }
  settings: {
    apiKey: '',
    dailyGoal: 1200,
    userName: 'Yanxu',
    userAvatar: null, // base64
  },
  // UI state
  selectedMealType: 'breakfast',
  foodDetailItem: null,  // food object from DB or custom
  showCamera: false,
  addFoodMode: false,    // 进入search是为了添加食物
}

// Actions
const A = {
  SET_PAGE: 'SET_PAGE',
  SET_DATE: 'SET_DATE',
  ADD_FOOD_ENTRY: 'ADD_FOOD_ENTRY',
  REMOVE_FOOD_ENTRY: 'REMOVE_FOOD_ENTRY',
  UPDATE_SETTINGS: 'UPDATE_SETTINGS',
  SET_SELECTED_MEAL: 'SET_SELECTED_MEAL',
  SHOW_FOOD_DETAIL: 'SHOW_FOOD_DETAIL',
  HIDE_FOOD_DETAIL: 'HIDE_FOOD_DETAIL',
  SHOW_CAMERA: 'SHOW_CAMERA',
  HIDE_CAMERA: 'HIDE_CAMERA',
  SET_ADD_FOOD_MODE: 'SET_ADD_FOOD_MODE',
  LOAD_STATE: 'LOAD_STATE',
}

function reducer(state, action) {
  switch (action.type) {
    case A.LOAD_STATE:
      return { ...state, ...action.payload }

    case A.SET_PAGE:
      return { ...state, currentPage: action.payload }

    case A.SET_DATE:
      return { ...state, currentDate: action.payload }

    case A.ADD_FOOD_ENTRY: {
      const { date, mealType, entry } = action.payload
      const dateMeals = state.meals[date] || emptyMeals()
      return {
        ...state,
        meals: {
          ...state.meals,
          [date]: {
            ...dateMeals,
            [mealType]: [...dateMeals[mealType], entry]
          }
        }
      }
    }

    case A.REMOVE_FOOD_ENTRY: {
      const { date, mealType, entryId } = action.payload
      const dateMeals = state.meals[date] || emptyMeals()
      return {
        ...state,
        meals: {
          ...state.meals,
          [date]: {
            ...dateMeals,
            [mealType]: dateMeals[mealType].filter(e => e.id !== entryId)
          }
        }
      }
    }

    case A.UPDATE_SETTINGS:
      return {
        ...state,
        settings: { ...state.settings, ...action.payload }
      }

    case A.SET_SELECTED_MEAL:
      return { ...state, selectedMealType: action.payload }

    case A.SHOW_FOOD_DETAIL:
      return { ...state, foodDetailItem: action.payload }

    case A.HIDE_FOOD_DETAIL:
      return { ...state, foodDetailItem: null }

    case A.SHOW_CAMERA:
      return { ...state, showCamera: true }

    case A.HIDE_CAMERA:
      return { ...state, showCamera: false }

    case A.SET_ADD_FOOD_MODE:
      return { ...state, addFoodMode: action.payload }

    default:
      return state
  }
}

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  // 从 localStorage 加载状态
  useEffect(() => {
    try {
      const saved = localStorage.getItem('yanxucal_state')
      if (saved) {
        const parsed = JSON.parse(saved)
        dispatch({
          type: A.LOAD_STATE,
          payload: {
            meals: parsed.meals || {},
            settings: { ...initialState.settings, ...(parsed.settings || {}) },
          }
        })
      }
    } catch (e) {
      console.error('Failed to load state', e)
    }
  }, [])

  // 保存到 localStorage
  useEffect(() => {
    try {
      localStorage.setItem('yanxucal_state', JSON.stringify({
        meals: state.meals,
        settings: state.settings,
      }))
    } catch (e) {
      console.error('Failed to save state', e)
    }
  }, [state.meals, state.settings])

  // 获取某天的餐食
  function getDayMeals(date) {
    return state.meals[date] || emptyMeals()
  }

  // 计算某天某餐的营养合计
  function getMealTotals(date, mealType) {
    const entries = getDayMeals(date)[mealType] || []
    return entries.reduce((acc, e) => ({
      calories: acc.calories + e.calories,
      carbs: acc.carbs + e.carbs,
      protein: acc.protein + e.protein,
      fat: acc.fat + e.fat,
    }), { calories: 0, carbs: 0, protein: 0, fat: 0 })
  }

  // 计算某天总营养
  function getDayTotals(date) {
    const meals = getDayMeals(date)
    const all = [
      ...meals.breakfast,
      ...meals.lunch,
      ...meals.dinner,
      ...meals.snacks,
    ]
    return all.reduce((acc, e) => ({
      calories: acc.calories + e.calories,
      carbs: acc.carbs + e.carbs,
      protein: acc.protein + e.protein,
      fat: acc.fat + e.fat,
    }), { calories: 0, carbs: 0, protein: 0, fat: 0 })
  }

  // 添加食物条目
  function addFoodEntry(mealType, foodData, date) {
    const entry = {
      id: Date.now() + Math.random(),
      ...foodData,
    }
    dispatch({
      type: A.ADD_FOOD_ENTRY,
      payload: { date: date || state.currentDate, mealType, entry }
    })
  }

  // 删除食物条目
  function removeFoodEntry(date, mealType, entryId) {
    dispatch({ type: A.REMOVE_FOOD_ENTRY, payload: { date, mealType, entryId } })
  }

  // 进入添加食物模式（从仪表板点 +）
  function startAddFood(mealType) {
    dispatch({ type: A.SET_SELECTED_MEAL, payload: mealType })
    dispatch({ type: A.SET_ADD_FOOD_MODE, payload: true })
    dispatch({ type: A.SET_PAGE, payload: 'search' })
  }

  // 进入普通搜索模式
  function goToSearch() {
    dispatch({ type: A.SET_ADD_FOOD_MODE, payload: false })
    dispatch({ type: A.SET_PAGE, payload: 'search' })
  }

  const value = {
    state,
    dispatch,
    actions: A,
    getDayMeals,
    getMealTotals,
    getDayTotals,
    addFoodEntry,
    removeFoodEntry,
    startAddFood,
    goToSearch,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
