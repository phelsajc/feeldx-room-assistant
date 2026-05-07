import { materialCost } from '../data/costs'

/**
 * @param {Record<string, string>} selections
 * @param {{ key: string, label: string }[]} items
 * @returns {{ total: number, lines: { key: string, label: string, value: string, lineCost: number }[] }}
 */
export function estimateRoomMaterialsCost(selections, items) {
  const lines = []
  let total = 0

  for (const item of items) {
    const value = selections[item.key] ?? ''
    const lineCost = materialCost(value)
    if (value) total += lineCost
    lines.push({
      key: item.key,
      label: item.label,
      value,
      lineCost: value ? lineCost : 0,
    })
  }

  return { total, lines }
}
