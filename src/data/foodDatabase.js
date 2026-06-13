// 食物数据库 - 包含中西方常见食物
// 所有营养数据基于每100g（或100ml）

export const FOOD_CATEGORIES = [
  { id: 'all', name: '全部' },
  { id: 'staple', name: '主食' },
  { id: 'vegetable', name: '蔬菜' },
  { id: 'fruit', name: '水果' },
  { id: 'meat', name: '肉类' },
  { id: 'seafood', name: '海鲜' },
  { id: 'egg_dairy', name: '蛋奶' },
  { id: 'bean', name: '豆制品' },
  { id: 'nut', name: '坚果' },
  { id: 'dish', name: '菜肴' },
  { id: 'snack', name: '零食' },
  { id: 'beverage', name: '饮品' },
  { id: 'fast_food', name: '快餐' },
]

// calories per 100g/ml, carbs/protein/fat in grams per 100g
export const FOOD_DATABASE = [
  // ——— 主食 ———
  { id: 1, name: '白米饭', category: 'staple', emoji: '🍚', calories: 130, carbs: 28.7, protein: 2.7, fat: 0.3, unit: 'g', serving: 200, servingLabel: '1碗(200g)' },
  { id: 2, name: '糙米饭', category: 'staple', emoji: '🍚', calories: 112, carbs: 23.5, protein: 2.6, fat: 0.9, unit: 'g', serving: 200, servingLabel: '1碗(200g)' },
  { id: 3, name: '白面条（煮熟）', category: 'staple', emoji: '🍜', calories: 138, carbs: 28.1, protein: 4.5, fat: 0.8, unit: 'g', serving: 200, servingLabel: '1碗(200g)' },
  { id: 4, name: '全麦面条', category: 'staple', emoji: '🍜', calories: 124, carbs: 24.5, protein: 4.9, fat: 0.9, unit: 'g', serving: 200, servingLabel: '1碗(200g)' },
  { id: 5, name: '馒头', category: 'staple', emoji: '🫓', calories: 223, carbs: 47.0, protein: 7.0, fat: 1.1, unit: 'g', serving: 80, servingLabel: '1个(80g)' },
  { id: 6, name: '花卷', category: 'staple', emoji: '🫓', calories: 217, carbs: 45.0, protein: 6.5, fat: 1.5, unit: 'g', serving: 80, servingLabel: '1个(80g)' },
  { id: 7, name: '肉包子', category: 'staple', emoji: '🥟', calories: 220, carbs: 35.0, protein: 9.0, fat: 5.0, unit: 'g', serving: 80, servingLabel: '1个(80g)' },
  { id: 8, name: '猪肉饺子', category: 'staple', emoji: '🥟', calories: 206, carbs: 30.0, protein: 10.0, fat: 5.5, unit: 'g', serving: 100, servingLabel: '6个(100g)' },
  { id: 9, name: '白吐司', category: 'staple', emoji: '🍞', calories: 265, carbs: 50.5, protein: 8.3, fat: 3.2, unit: 'g', serving: 60, servingLabel: '2片(60g)' },
  { id: 10, name: '全麦面包', category: 'staple', emoji: '🍞', calories: 247, carbs: 43.1, protein: 9.0, fat: 3.4, unit: 'g', serving: 60, servingLabel: '2片(60g)' },
  { id: 11, name: '燕麦片', category: 'staple', emoji: '🥣', calories: 389, carbs: 66.3, protein: 16.9, fat: 6.9, unit: 'g', serving: 50, servingLabel: '1份(50g)' },
  { id: 12, name: '玉米（煮熟）', category: 'staple', emoji: '🌽', calories: 86, carbs: 19.0, protein: 3.3, fat: 1.2, unit: 'g', serving: 200, servingLabel: '1根(200g)' },
  { id: 13, name: '红薯', category: 'staple', emoji: '🍠', calories: 86, carbs: 20.1, protein: 1.6, fat: 0.1, unit: 'g', serving: 150, servingLabel: '1个(150g)' },
  { id: 14, name: '紫薯', category: 'staple', emoji: '🍠', calories: 82, carbs: 19.2, protein: 1.5, fat: 0.1, unit: 'g', serving: 150, servingLabel: '1个(150g)' },
  { id: 15, name: '荞麦面', category: 'staple', emoji: '🍜', calories: 132, carbs: 27.8, protein: 5.0, fat: 0.7, unit: 'g', serving: 200, servingLabel: '1碗(200g)' },

  // ——— 蔬菜 ———
  { id: 20, name: '大白菜', category: 'vegetable', emoji: '🥬', calories: 23, carbs: 4.6, protein: 1.5, fat: 0.2, unit: 'g', serving: 100, servingLabel: '1份(100g)' },
  { id: 21, name: '菠菜', category: 'vegetable', emoji: '🥬', calories: 23, carbs: 3.6, protein: 2.9, fat: 0.4, unit: 'g', serving: 100, servingLabel: '1份(100g)' },
  { id: 22, name: '西兰花', category: 'vegetable', emoji: '🥦', calories: 34, carbs: 6.6, protein: 2.8, fat: 0.4, unit: 'g', serving: 100, servingLabel: '1份(100g)' },
  { id: 23, name: '胡萝卜', category: 'vegetable', emoji: '🥕', calories: 41, carbs: 9.6, protein: 0.9, fat: 0.2, unit: 'g', serving: 100, servingLabel: '1根(100g)' },
  { id: 24, name: '土豆', category: 'vegetable', emoji: '🥔', calories: 77, carbs: 17.0, protein: 2.0, fat: 0.1, unit: 'g', serving: 150, servingLabel: '1个(150g)' },
  { id: 25, name: '番茄', category: 'vegetable', emoji: '🍅', calories: 18, carbs: 3.9, protein: 0.9, fat: 0.2, unit: 'g', serving: 150, servingLabel: '1个(150g)' },
  { id: 26, name: '黄瓜', category: 'vegetable', emoji: '🥒', calories: 15, carbs: 3.6, protein: 0.7, fat: 0.1, unit: 'g', serving: 100, servingLabel: '半根(100g)' },
  { id: 27, name: '茄子', category: 'vegetable', emoji: '🍆', calories: 25, carbs: 5.7, protein: 1.0, fat: 0.2, unit: 'g', serving: 100, servingLabel: '1份(100g)' },
  { id: 28, name: '青椒', category: 'vegetable', emoji: '🌶️', calories: 27, carbs: 6.3, protein: 1.0, fat: 0.3, unit: 'g', serving: 80, servingLabel: '1个(80g)' },
  { id: 29, name: '洋葱', category: 'vegetable', emoji: '🧅', calories: 40, carbs: 9.3, protein: 1.1, fat: 0.1, unit: 'g', serving: 100, servingLabel: '半个(100g)' },
  { id: 30, name: '蘑菇', category: 'vegetable', emoji: '🍄', calories: 22, carbs: 3.3, protein: 3.1, fat: 0.3, unit: 'g', serving: 100, servingLabel: '1份(100g)' },
  { id: 31, name: '芹菜', category: 'vegetable', emoji: '🥬', calories: 14, carbs: 3.0, protein: 0.7, fat: 0.1, unit: 'g', serving: 100, servingLabel: '1份(100g)' },
  { id: 32, name: '豆芽', category: 'vegetable', emoji: '🌱', calories: 30, carbs: 5.9, protein: 3.0, fat: 0.1, unit: 'g', serving: 100, servingLabel: '1份(100g)' },
  { id: 33, name: '空心菜', category: 'vegetable', emoji: '🥬', calories: 20, carbs: 3.0, protein: 2.2, fat: 0.3, unit: 'g', serving: 100, servingLabel: '1份(100g)' },
  { id: 34, name: '生菜', category: 'vegetable', emoji: '🥗', calories: 15, carbs: 2.8, protein: 1.4, fat: 0.2, unit: 'g', serving: 100, servingLabel: '1份(100g)' },
  { id: 35, name: '韭菜', category: 'vegetable', emoji: '🌿', calories: 28, carbs: 4.7, protein: 2.4, fat: 0.4, unit: 'g', serving: 100, servingLabel: '1份(100g)' },

  // ——— 水果 ———
  { id: 40, name: '苹果', category: 'fruit', emoji: '🍎', calories: 52, carbs: 14.0, protein: 0.3, fat: 0.2, unit: 'g', serving: 200, servingLabel: '1个(200g)' },
  { id: 41, name: '香蕉', category: 'fruit', emoji: '🍌', calories: 89, carbs: 23.0, protein: 1.1, fat: 0.3, unit: 'g', serving: 120, servingLabel: '1根(120g)' },
  { id: 42, name: '橙子', category: 'fruit', emoji: '🍊', calories: 47, carbs: 11.8, protein: 0.9, fat: 0.1, unit: 'g', serving: 200, servingLabel: '1个(200g)' },
  { id: 43, name: '葡萄', category: 'fruit', emoji: '🍇', calories: 67, carbs: 17.2, protein: 0.6, fat: 0.4, unit: 'g', serving: 150, servingLabel: '1串(150g)' },
  { id: 44, name: '草莓', category: 'fruit', emoji: '🍓', calories: 32, carbs: 7.7, protein: 0.7, fat: 0.3, unit: 'g', serving: 150, servingLabel: '10粒(150g)' },
  { id: 45, name: '西瓜', category: 'fruit', emoji: '🍉', calories: 30, carbs: 7.6, protein: 0.6, fat: 0.2, unit: 'g', serving: 300, servingLabel: '1块(300g)' },
  { id: 46, name: '芒果', category: 'fruit', emoji: '🥭', calories: 60, carbs: 15.0, protein: 0.8, fat: 0.4, unit: 'g', serving: 200, servingLabel: '1个(200g)' },
  { id: 47, name: '蓝莓', category: 'fruit', emoji: '🫐', calories: 57, carbs: 14.5, protein: 0.7, fat: 0.3, unit: 'g', serving: 100, servingLabel: '1份(100g)' },
  { id: 48, name: '梨', category: 'fruit', emoji: '🍐', calories: 57, carbs: 15.2, protein: 0.4, fat: 0.1, unit: 'g', serving: 200, servingLabel: '1个(200g)' },
  { id: 49, name: '桃子', category: 'fruit', emoji: '🍑', calories: 39, carbs: 9.5, protein: 0.9, fat: 0.3, unit: 'g', serving: 150, servingLabel: '1个(150g)' },
  { id: 50, name: '哈密瓜', category: 'fruit', emoji: '🍈', calories: 34, carbs: 8.6, protein: 0.8, fat: 0.2, unit: 'g', serving: 200, servingLabel: '1块(200g)' },
  { id: 51, name: '猕猴桃', category: 'fruit', emoji: '🥝', calories: 61, carbs: 14.7, protein: 1.1, fat: 0.5, unit: 'g', serving: 100, servingLabel: '1个(100g)' },
  { id: 52, name: '柠檬', category: 'fruit', emoji: '🍋', calories: 29, carbs: 9.3, protein: 1.1, fat: 0.3, unit: 'g', serving: 50, servingLabel: '半个(50g)' },

  // ——— 肉类 ———
  { id: 60, name: '鸡胸肉', category: 'meat', emoji: '🍗', calories: 165, carbs: 0, protein: 31.0, fat: 3.6, unit: 'g', serving: 150, servingLabel: '1块(150g)' },
  { id: 61, name: '鸡腿肉', category: 'meat', emoji: '🍗', calories: 185, carbs: 0, protein: 26.0, fat: 8.5, unit: 'g', serving: 150, servingLabel: '1个(150g)' },
  { id: 62, name: '猪里脊', category: 'meat', emoji: '🥩', calories: 143, carbs: 0, protein: 20.7, fat: 6.2, unit: 'g', serving: 100, servingLabel: '1份(100g)' },
  { id: 63, name: '猪五花肉', category: 'meat', emoji: '🥩', calories: 518, carbs: 0, protein: 9.5, fat: 53.0, unit: 'g', serving: 100, servingLabel: '1份(100g)' },
  { id: 64, name: '牛腱子肉', category: 'meat', emoji: '🥩', calories: 106, carbs: 0, protein: 20.2, fat: 2.5, unit: 'g', serving: 100, servingLabel: '1份(100g)' },
  { id: 65, name: '牛肉（肥瘦）', category: 'meat', emoji: '🥩', calories: 213, carbs: 0, protein: 19.9, fat: 14.2, unit: 'g', serving: 100, servingLabel: '1份(100g)' },
  { id: 66, name: '羊肉', category: 'meat', emoji: '🥩', calories: 203, carbs: 0, protein: 19.0, fat: 14.1, unit: 'g', serving: 100, servingLabel: '1份(100g)' },
  { id: 67, name: '鸭腿', category: 'meat', emoji: '🍗', calories: 240, carbs: 0, protein: 15.8, fat: 19.7, unit: 'g', serving: 150, servingLabel: '1个(150g)' },
  { id: 68, name: '火腿肠', category: 'meat', emoji: '🌭', calories: 212, carbs: 10.0, protein: 13.5, fat: 14.0, unit: 'g', serving: 60, servingLabel: '1根(60g)' },

  // ——— 海鲜 ———
  { id: 70, name: '三文鱼', category: 'seafood', emoji: '🐟', calories: 208, carbs: 0, protein: 20.4, fat: 13.4, unit: 'g', serving: 150, servingLabel: '1块(150g)' },
  { id: 71, name: '鲈鱼', category: 'seafood', emoji: '🐟', calories: 105, carbs: 0, protein: 18.6, fat: 3.4, unit: 'g', serving: 150, servingLabel: '1份(150g)' },
  { id: 72, name: '鲫鱼', category: 'seafood', emoji: '🐟', calories: 108, carbs: 0, protein: 17.1, fat: 4.1, unit: 'g', serving: 150, servingLabel: '1条(150g)' },
  { id: 73, name: '大虾', category: 'seafood', emoji: '🦐', calories: 85, carbs: 0, protein: 18.2, fat: 1.4, unit: 'g', serving: 100, servingLabel: '5只(100g)' },
  { id: 74, name: '蛤蜊', category: 'seafood', emoji: '🦪', calories: 62, carbs: 2.5, protein: 10.8, fat: 1.5, unit: 'g', serving: 100, servingLabel: '1份(100g)' },
  { id: 75, name: '带鱼', category: 'seafood', emoji: '🐟', calories: 127, carbs: 0, protein: 17.7, fat: 6.2, unit: 'g', serving: 100, servingLabel: '1份(100g)' },
  { id: 76, name: '扇贝', category: 'seafood', emoji: '🦪', calories: 60, carbs: 2.6, protein: 11.1, fat: 0.6, unit: 'g', serving: 100, servingLabel: '3个(100g)' },

  // ——— 蛋奶 ———
  { id: 80, name: '鸡蛋', category: 'egg_dairy', emoji: '🥚', calories: 144, carbs: 0.9, protein: 12.4, fat: 9.9, unit: 'g', serving: 60, servingLabel: '1个(60g)' },
  { id: 81, name: '鸭蛋', category: 'egg_dairy', emoji: '🥚', calories: 180, carbs: 0.9, protein: 12.6, fat: 13.0, unit: 'g', serving: 65, servingLabel: '1个(65g)' },
  { id: 82, name: '牛奶（全脂）', category: 'egg_dairy', emoji: '🥛', calories: 61, carbs: 4.7, protein: 3.2, fat: 3.6, unit: 'ml', serving: 250, servingLabel: '1杯(250ml)' },
  { id: 83, name: '牛奶（脱脂）', category: 'egg_dairy', emoji: '🥛', calories: 35, carbs: 4.9, protein: 3.4, fat: 0.1, unit: 'ml', serving: 250, servingLabel: '1杯(250ml)' },
  { id: 84, name: '酸奶（原味）', category: 'egg_dairy', emoji: '🥛', calories: 59, carbs: 8.5, protein: 5.0, fat: 0.4, unit: 'g', serving: 200, servingLabel: '1杯(200g)' },
  { id: 85, name: '酸奶（全脂）', category: 'egg_dairy', emoji: '🥛', calories: 97, carbs: 7.0, protein: 5.0, fat: 5.0, unit: 'g', serving: 200, servingLabel: '1杯(200g)' },
  { id: 86, name: '奶酪', category: 'egg_dairy', emoji: '🧀', calories: 402, carbs: 1.3, protein: 25.0, fat: 33.0, unit: 'g', serving: 30, servingLabel: '1片(30g)' },

  // ——— 豆制品 ———
  { id: 90, name: '豆腐（北豆腐）', category: 'bean', emoji: '🟧', calories: 116, carbs: 4.0, protein: 12.2, fat: 4.8, unit: 'g', serving: 150, servingLabel: '半块(150g)' },
  { id: 91, name: '内酯豆腐', category: 'bean', emoji: '🟧', calories: 47, carbs: 2.8, protein: 5.0, fat: 1.9, unit: 'g', serving: 150, servingLabel: '1份(150g)' },
  { id: 92, name: '豆浆（无糖）', category: 'bean', emoji: '🥛', calories: 33, carbs: 1.8, protein: 3.0, fat: 1.8, unit: 'ml', serving: 250, servingLabel: '1杯(250ml)' },
  { id: 93, name: '纳豆', category: 'bean', emoji: '🫘', calories: 200, carbs: 12.1, protein: 16.5, fat: 10.0, unit: 'g', serving: 100, servingLabel: '1份(100g)' },
  { id: 94, name: '毛豆', category: 'bean', emoji: '🫘', calories: 122, carbs: 11.0, protein: 10.5, fat: 5.1, unit: 'g', serving: 100, servingLabel: '1份(100g)' },
  { id: 95, name: '豆干', category: 'bean', emoji: '🟤', calories: 140, carbs: 9.0, protein: 16.2, fat: 3.6, unit: 'g', serving: 100, servingLabel: '1份(100g)' },

  // ——— 坚果 ———
  { id: 100, name: '核桃', category: 'nut', emoji: '🌰', calories: 654, carbs: 13.7, protein: 15.2, fat: 65.2, unit: 'g', serving: 30, servingLabel: '3个(30g)' },
  { id: 101, name: '花生', category: 'nut', emoji: '🥜', calories: 567, carbs: 16.1, protein: 25.8, fat: 49.2, unit: 'g', serving: 30, servingLabel: '1小把(30g)' },
  { id: 102, name: '腰果', category: 'nut', emoji: '🌰', calories: 553, carbs: 32.7, protein: 18.2, fat: 43.8, unit: 'g', serving: 30, servingLabel: '10颗(30g)' },
  { id: 103, name: '杏仁', category: 'nut', emoji: '🌰', calories: 579, carbs: 21.6, protein: 21.2, fat: 49.9, unit: 'g', serving: 25, servingLabel: '15颗(25g)' },
  { id: 104, name: '开心果', category: 'nut', emoji: '🌰', calories: 560, carbs: 27.2, protein: 20.6, fat: 45.4, unit: 'g', serving: 30, servingLabel: '1小把(30g)' },
  { id: 105, name: '葵花籽', category: 'nut', emoji: '🌻', calories: 592, carbs: 20.0, protein: 20.8, fat: 52.8, unit: 'g', serving: 30, servingLabel: '1小把(30g)' },

  // ——— 菜肴 ———
  { id: 110, name: '番茄炒鸡蛋', category: 'dish', emoji: '🍳', calories: 85, carbs: 4.8, protein: 5.2, fat: 5.0, unit: 'g', serving: 200, servingLabel: '1份(200g)' },
  { id: 111, name: '红烧肉', category: 'dish', emoji: '🥩', calories: 476, carbs: 15.0, protein: 12.0, fat: 42.0, unit: 'g', serving: 100, servingLabel: '1份(100g)' },
  { id: 112, name: '宫保鸡丁', category: 'dish', emoji: '🍗', calories: 186, carbs: 8.2, protein: 14.5, fat: 10.8, unit: 'g', serving: 200, servingLabel: '1份(200g)' },
  { id: 113, name: '麻婆豆腐', category: 'dish', emoji: '🟧', calories: 120, carbs: 4.8, protein: 8.2, fat: 7.5, unit: 'g', serving: 200, servingLabel: '1份(200g)' },
  { id: 114, name: '清炒蔬菜', category: 'dish', emoji: '🥬', calories: 45, carbs: 5.5, protein: 2.0, fat: 2.0, unit: 'g', serving: 200, servingLabel: '1份(200g)' },
  { id: 115, name: '蛋炒饭', category: 'dish', emoji: '🍳', calories: 160, carbs: 26.0, protein: 5.2, fat: 4.5, unit: 'g', serving: 250, servingLabel: '1碗(250g)' },
  { id: 116, name: '馄饨', category: 'dish', emoji: '🥟', calories: 110, carbs: 15.8, protein: 5.8, fat: 2.5, unit: 'g', serving: 250, servingLabel: '1碗(250g)' },
  { id: 117, name: '春卷（炸）', category: 'dish', emoji: '🧆', calories: 233, carbs: 24.6, protein: 5.8, fat: 12.4, unit: 'g', serving: 80, servingLabel: '2个(80g)' },
  { id: 118, name: '煎鸡蛋', category: 'dish', emoji: '🍳', calories: 196, carbs: 0.8, protein: 12.5, fat: 15.8, unit: 'g', serving: 60, servingLabel: '1个(60g)' },
  { id: 119, name: '糖醋排骨', category: 'dish', emoji: '🍖', calories: 380, carbs: 22.0, protein: 18.0, fat: 24.0, unit: 'g', serving: 150, servingLabel: '1份(150g)' },
  { id: 120, name: '水煮鱼', category: 'dish', emoji: '🐟', calories: 130, carbs: 3.0, protein: 18.0, fat: 5.5, unit: 'g', serving: 200, servingLabel: '1份(200g)' },
  { id: 121, name: '扬州炒饭', category: 'dish', emoji: '🍳', calories: 175, carbs: 28.0, protein: 7.0, fat: 5.0, unit: 'g', serving: 250, servingLabel: '1碗(250g)' },

  // ——— 零食 ———
  { id: 130, name: '薯片', category: 'snack', emoji: '🍟', calories: 536, carbs: 53.0, protein: 7.0, fat: 34.6, unit: 'g', serving: 50, servingLabel: '半包(50g)' },
  { id: 131, name: '黑巧克力', category: 'snack', emoji: '🍫', calories: 546, carbs: 60.0, protein: 4.9, fat: 31.3, unit: 'g', serving: 30, servingLabel: '1格(30g)' },
  { id: 132, name: '牛奶巧克力', category: 'snack', emoji: '🍫', calories: 535, carbs: 59.4, protein: 7.7, fat: 29.7, unit: 'g', serving: 30, servingLabel: '1格(30g)' },
  { id: 133, name: '苏打饼干', category: 'snack', emoji: '🍪', calories: 408, carbs: 72.0, protein: 9.8, fat: 9.8, unit: 'g', serving: 40, servingLabel: '4片(40g)' },
  { id: 134, name: '奥利奥', category: 'snack', emoji: '🍪', calories: 480, carbs: 66.8, protein: 4.7, fat: 21.4, unit: 'g', serving: 40, servingLabel: '4块(40g)' },
  { id: 135, name: '冰淇淋', category: 'snack', emoji: '🍦', calories: 207, carbs: 23.6, protein: 3.5, fat: 11.0, unit: 'g', serving: 100, servingLabel: '1份(100g)' },
  { id: 136, name: '蛋糕（奶油）', category: 'snack', emoji: '🎂', calories: 347, carbs: 52.6, protein: 5.1, fat: 14.0, unit: 'g', serving: 100, servingLabel: '1块(100g)' },
  { id: 137, name: '泡芙', category: 'snack', emoji: '🍮', calories: 350, carbs: 40.0, protein: 6.0, fat: 18.0, unit: 'g', serving: 60, servingLabel: '1个(60g)' },
  { id: 138, name: '老酸奶雪糕', category: 'snack', emoji: '🍦', calories: 180, carbs: 24.0, protein: 3.5, fat: 7.0, unit: 'g', serving: 80, servingLabel: '1支(80g)' },
  { id: 139, name: '锅巴', category: 'snack', emoji: '🍟', calories: 459, carbs: 68.0, protein: 7.5, fat: 18.0, unit: 'g', serving: 40, servingLabel: '1小袋(40g)' },

  // ——— 饮品 ———
  { id: 150, name: '可口可乐', category: 'beverage', emoji: '🥤', calories: 43, carbs: 10.9, protein: 0, fat: 0, unit: 'ml', serving: 330, servingLabel: '1罐(330ml)' },
  { id: 151, name: '橙汁（鲜榨）', category: 'beverage', emoji: '🍊', calories: 45, carbs: 10.4, protein: 0.7, fat: 0.2, unit: 'ml', serving: 250, servingLabel: '1杯(250ml)' },
  { id: 152, name: '咖啡（黑）', category: 'beverage', emoji: '☕', calories: 2, carbs: 0, protein: 0.3, fat: 0, unit: 'ml', serving: 250, servingLabel: '1杯(250ml)' },
  { id: 153, name: '拿铁', category: 'beverage', emoji: '☕', calories: 67, carbs: 6.6, protein: 3.5, fat: 2.9, unit: 'ml', serving: 350, servingLabel: '1杯(350ml)' },
  { id: 154, name: '奶茶（全糖）', category: 'beverage', emoji: '🧋', calories: 80, carbs: 15.0, protein: 1.5, fat: 1.8, unit: 'ml', serving: 500, servingLabel: '1杯(500ml)' },
  { id: 155, name: '绿茶', category: 'beverage', emoji: '🍵', calories: 1, carbs: 0.2, protein: 0.2, fat: 0, unit: 'ml', serving: 300, servingLabel: '1杯(300ml)' },
  { id: 156, name: '运动饮料', category: 'beverage', emoji: '🥤', calories: 24, carbs: 5.9, protein: 0.1, fat: 0, unit: 'ml', serving: 500, servingLabel: '1瓶(500ml)' },
  { id: 157, name: '苹果汁', category: 'beverage', emoji: '🍎', calories: 46, carbs: 11.3, protein: 0.1, fat: 0.1, unit: 'ml', serving: 250, servingLabel: '1杯(250ml)' },
  { id: 158, name: '啤酒', category: 'beverage', emoji: '🍺', calories: 43, carbs: 3.6, protein: 0.5, fat: 0, unit: 'ml', serving: 330, servingLabel: '1罐(330ml)' },
  { id: 159, name: '豆浆（有糖）', category: 'beverage', emoji: '🥛', calories: 57, carbs: 6.0, protein: 3.0, fat: 1.8, unit: 'ml', serving: 250, servingLabel: '1杯(250ml)' },

  // ——— 快餐 ———
  { id: 160, name: '麦辣鸡腿堡', category: 'fast_food', emoji: '🍔', calories: 472, carbs: 49.0, protein: 24.0, fat: 19.0, unit: 'g', serving: 200, servingLabel: '1个(200g)' },
  { id: 161, name: '炸鸡翅', category: 'fast_food', emoji: '🍗', calories: 335, carbs: 15.0, protein: 24.0, fat: 19.0, unit: 'g', serving: 100, servingLabel: '1个(100g)' },
  { id: 162, name: '薯条（大份）', category: 'fast_food', emoji: '🍟', calories: 312, carbs: 41.0, protein: 3.4, fat: 15.0, unit: 'g', serving: 150, servingLabel: '大份(150g)' },
  { id: 163, name: '披萨（芝士）', category: 'fast_food', emoji: '🍕', calories: 266, carbs: 33.0, protein: 11.0, fat: 10.4, unit: 'g', serving: 100, servingLabel: '1片(100g)' },
  { id: 164, name: '鸡蛋灌饼', category: 'fast_food', emoji: '🫓', calories: 260, carbs: 35.0, protein: 9.5, fat: 9.0, unit: 'g', serving: 150, servingLabel: '1个(150g)' },
  { id: 165, name: '煎饼果子', category: 'fast_food', emoji: '🫓', calories: 240, carbs: 34.0, protein: 9.0, fat: 8.0, unit: 'g', serving: 150, servingLabel: '1个(150g)' },
  { id: 166, name: '肉夹馍', category: 'fast_food', emoji: '🫓', calories: 265, carbs: 32.0, protein: 12.0, fat: 9.0, unit: 'g', serving: 150, servingLabel: '1个(150g)' },
  { id: 167, name: '热干面', category: 'fast_food', emoji: '🍜', calories: 145, carbs: 24.5, protein: 4.5, fat: 4.0, unit: 'g', serving: 300, servingLabel: '1碗(300g)' },
]

// 搜索食物
export function searchFoods(query, category = 'all') {
  let results = FOOD_DATABASE
  if (category !== 'all') {
    results = results.filter(f => f.category === category)
  }
  if (query.trim()) {
    const q = query.toLowerCase().trim()
    results = results.filter(f =>
      f.name.toLowerCase().includes(q)
    )
  }
  return results
}

// 通过ID获取食物
export function getFoodById(id) {
  return FOOD_DATABASE.find(f => f.id === id) || null
}

// 计算指定克数的营养素
export function calcNutrition(food, grams) {
  const ratio = grams / 100
  return {
    calories: Math.round(food.calories * ratio),
    carbs: Math.round(food.carbs * ratio * 10) / 10,
    protein: Math.round(food.protein * ratio * 10) / 10,
    fat: Math.round(food.fat * ratio * 10) / 10,
  }
}
