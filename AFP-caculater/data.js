// AFP 抵扣系数数据 — 火山方舟 Agent Plan
// 数据来源：https://www.volcengine.com/docs/82379/2516283
// 套餐来源：https://www.volcengine.com/docs/82379/2366394
// 更新方式：官方文档变动时手动修改本文件，页面顶部会展示版本号

const DATA_META = {
  version: '2026-07-13',
  sourceUrl: 'https://www.volcengine.com/docs/82379/2516283',
  sourcePlanUrl: 'https://www.volcengine.com/docs/82379/2366394',
  notes: '限时折扣活动未包含（如 deepseek-v4-pro 4折、kimi-k2.7-code/glm-5.2 2.5折）；仅含文本生成模型'
};

// 套餐额度表（AFP）
const PLANS = {
  small:  { name: 'Small',  price: 40,   monthly: 20000,  weekly: 7000,  fiveHours: 2000  },
  medium: { name: 'Medium', price: 200,  monthly: 100000, weekly: 35000, fiveHours: 10000 },
  large:  { name: 'Large',  price: 500,  monthly: 250000, weekly: 87500, fiveHours: 25000 },
  max:    { name: 'Max',    price: 1000, monthly: 500000, weekly: 175000, fiveHours: 50000 }
};

// 文本生成模型抵扣系数表（模型抵扣系数）
// 输入抵扣系数 = coefficient × segment.factor
// 输出抵扣系数 = coefficient × 1
const MODELS = [
  { key: 'doubao-seed-2.0-mini',  name: 'Doubao Seed 2.0 Mini',  category: '极速',  coefficient: 0.25 },
  { key: 'doubao-seed-2.0-lite',  name: 'Doubao Seed 2.0 Lite',  category: '标准',  coefficient: 0.5  },
  { key: 'deepseek-v4-flash',     name: 'DeepSeek V4 Flash',     category: '标准',  coefficient: 0.5  },
  { key: 'doubao-seed-2.0-code',  name: 'Doubao Seed 2.0 Code',  category: '进阶',  coefficient: 2.5  },
  { key: 'doubao-seed-2.0-pro',   name: 'Doubao Seed 2.0 Pro',   category: '进阶',  coefficient: 2.5  },
  { key: 'minimax-m2.7',          name: 'MiniMax M2.7',          category: '进阶',  coefficient: 2.5  },
  { key: 'minimax-m3',            name: 'MiniMax M3',            category: '进阶',  coefficient: 2.5  },
  { key: 'kimi-k2.6',             name: 'Kimi K2.6',             category: '进阶',  coefficient: 4.5  },
  { key: 'kimi-k2.7-code',        name: 'Kimi K2.7 Code',        category: '进阶',  coefficient: 4.5  },
  { key: 'glm-5.2',               name: 'GLM 5.2 (glm-latest)',  category: '进阶',  coefficient: 4.5  },
  { key: 'deepseek-v4-pro',       name: 'DeepSeek V4 Pro',       category: '进阶',  coefficient: 5.5  }
];

// 输入分段系数表
const SEGMENTS = [
  { key: 'le32k',    label: '≤ 32k',      factor: 0.67 },
  { key: '32to128k', label: '32k - 128k',  factor: 1    },
  { key: 'gt128k',   label: '> 128k',      factor: 2    }
];

// 预设使用场景（输入:输出 token 比例）
// defaultSegment: 该场景下的默认上下文分段（用户可手动覆盖）
const SCENARIOS = [
  { key: 'coding',   label: '编程开发', desc: 'Vibe Coding，大量代码上下文输入，少量补全输出', inputRatio: 9, outputRatio: 1, defaultSegment: '32to128k' },
  { key: 'textgen',  label: '文本生成', desc: '长文本、小说输出，少量 prompt，大量生成',       inputRatio: 1, outputRatio: 9, defaultSegment: 'le32k' },
  { key: 'dialogue', label: '普通对话', desc: '日常问答对话，输入输出相对均衡',               inputRatio: 1, outputRatio: 3, defaultSegment: 'le32k' }
];
