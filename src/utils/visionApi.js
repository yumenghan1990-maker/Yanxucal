// Claude Vision API 工具
const API_ENDPOINT = '/api/claude/v1/messages'
const API_KEY = import.meta.env.VITE_ANTHROPIC_AUTH_TOKEN || ''
const MODEL = 'claude-haiku-4-5-20251001'

const FOOD_PROMPT = `你是一个专业的营养师和食物识别AI。请仔细分析这张图片。

请判断图片类型：
A) 实物食物照片（盘子里的食物、食物本身）
B) 食品包装上的营养成分表

如果是A（实物食物）：
- 识别图片中的所有食物
- 估算每种食物的重量（克）
- 估算每100g的热量、碳水化合物、蛋白质、脂肪

如果是B（营养成分表）：
- 提取每100g/ml的热量、碳水化合物、蛋白质、脂肪数据
- 如果能看到净含量，也提取出来
- 如果看不清净含量，设置 needsManualInput 为 true

请严格按照以下JSON格式返回，不要有其他文字：

{
  "type": "food" | "label",
  "items": [
    {
      "name": "食物名称",
      "estimatedGrams": 150,
      "caloriesPer100g": 130,
      "carbsPer100g": 28.7,
      "proteinPer100g": 2.7,
      "fatPer100g": 0.3
    }
  ],
  "label": {
    "caloriesPer100g": 0,
    "carbsPer100g": 0,
    "proteinPer100g": 0,
    "fatPer100g": 0,
    "netContent": null,
    "netContentUnit": "g",
    "needsManualInput": false
  },
  "description": "简短描述识别到的内容"
}`

export async function analyzeImage(imageBase64, apiKey) {
  const base64Data = imageBase64.includes(',')
    ? imageBase64.split(',')[1]
    : imageBase64

  const mimeType = imageBase64.startsWith('data:image/png') ? 'image/png' : 'image/jpeg'

  const headers = {
    'Content-Type': 'application/json',
    'x-api-key': apiKey || API_KEY,
    'anthropic-version': '2023-06-01',
    'anthropic-dangerous-direct-browser-access': 'true',
  }

  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mimeType,
                data: base64Data,
              },
            },
            {
              type: 'text',
              text: FOOD_PROMPT,
            },
          ],
        },
      ],
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    console.error('API Error:', response.status, err)
    if (response.status === 401) throw new Error('API Key 无效，请检查设置')
    if (response.status === 429) throw new Error('请求过于频繁，请稍后重试')
    throw new Error(`API 请求失败: ${response.status} — ${err}`)
  }

  const data = await response.json()
  const content = data.content?.[0]?.text || ''

  const jsonMatch = content.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    throw new Error('无法解析 AI 返回结果')
  }

  try {
    return JSON.parse(jsonMatch[0])
  } catch {
    throw new Error('AI 返回格式不正确，请重试')
  }
}

export function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export function compressImage(file, maxWidth = 1024, quality = 0.8) {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      let { width, height } = img
      if (width > maxWidth) {
        height = (height * maxWidth) / width
        width = maxWidth
      }
      canvas.width = width
      canvas.height = height
      ctx.drawImage(img, 0, 0, width, height)
      resolve(canvas.toDataURL('image/jpeg', quality))
    }

    img.src = URL.createObjectURL(file)
  })
}
