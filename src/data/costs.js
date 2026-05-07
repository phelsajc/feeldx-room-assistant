
export const MATERIAL_COST_USD = {
  wood: 900,
  'dark-wood': 1100,
  marble: 3800,
  tile: 1200,
  'dark-tile': 1400,
  fabric: 650,
  leather: 1600,
  granite: 3200,
  quartz: 2900,
  painted: 450,
  'matte-black': 750,
  glass: 950,
  vinyl: 550,
  ceramic: 1000,
  laminate: 500,
}

export const COST_UNSPECIFIED = 0

/**
 * @param {string} [materialValue]
 * @returns {number}
 */
export function materialCost(materialValue) {
  if (!materialValue) return COST_UNSPECIFIED
  return MATERIAL_COST_USD[materialValue] ?? 800
}
