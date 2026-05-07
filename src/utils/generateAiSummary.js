import { MATERIAL_OPTIONS, LIGHTING_KEYS, FLOORING_KEY, WALL_KEY } from '../data/rooms'

const MARBLE = 'marble'
const otherPremiumValues = new Set(['granite', 'quartz'])

function labelForValue(val) {
  if (!val) return null
  const opt = MATERIAL_OPTIONS.find((o) => o.value === val)
  return opt?.label ?? val
}

function isMarble(val) {
  return val === MARBLE
}

function isOtherPremiumStone(val) {
  return val && otherPremiumValues.has(val)
}

function isDarkValue(val) {
  const opt = MATERIAL_OPTIONS.find((o) => o.value === val)
  return Boolean(opt?.isDark)
}

function hasLightingField(items) {
  return items.some((i) => LIGHTING_KEYS.has(i.key))
}

function lightingMissing(selections, items) {
  if (!hasLightingField(items)) return false
  const lightingItem = items.find((i) => LIGHTING_KEYS.has(i.key))
  if (!lightingItem) return false
  const v = selections[lightingItem.key]
  return !v
}

function bothFlooringAndWallDark(selections, items) {
  const keys = new Set(items.map((i) => i.key))
  if (!keys.has(FLOORING_KEY) || !keys.has(WALL_KEY)) return false
  const f = selections[FLOORING_KEY]
  const w = selections[WALL_KEY]
  if (!f || !w) return false
  return isDarkValue(f) && isDarkValue(w)
}

function incomplete(selections, items) {
  return items.some((i) => !selections[i.key])
}

function marbleMentions(selections, items) {
  const parts = []
  for (const { key, label } of items) {
    const v = selections[key]
    if (isMarble(v)) {
      parts.push(`${labelForValue(v).toLowerCase()} ${label.toLowerCase()}`)
    }
  }
  return parts
}

function otherPremiumMentions(selections, items) {
  const parts = []
  for (const { key, label } of items) {
    const v = selections[key]
    if (isOtherPremiumStone(v)) {
      parts.push(`${labelForValue(v).toLowerCase()} ${label.toLowerCase()}`)
    }
  }
  return parts
}

/**
 * @param {string} roomLabel
 * @param {Record<string, string>} selections
 * @param {{ key: string, label: string }[]} items
 */
export function generateAiSummary(roomLabel, selections, items) {
  const sentences = []
  const lowerRoom = roomLabel.toLowerCase()

  const marbleParts = marbleMentions(selections, items)
  if (marbleParts.length) {
    sentences.push(`This ${lowerRoom} uses ${marbleParts.join(', ')}, indicating a higher cost range.`)
    sentences.push('Higher cost materials selected.')
  }

  const otherStone = otherPremiumMentions(selections, items)
  if (otherStone.length && !marbleParts.length) {
    sentences.push(
      `This ${lowerRoom} includes ${otherStone.join(', ')}, suggesting a mid-to-premium budget band.`,
    )
  }

  if (lightingMissing(selections, items)) {
    sentences.push('Lighting has not been selected, which may impact usability.')
    sentences.push('Consider adding lighting.')
  }

  if (bothFlooringAndWallDark(selections, items)) {
    sentences.push('Room may feel darker.')
  }

  if (incomplete(selections, items)) {
    sentences.push('Some selections are missing.')
  }

  // Nothing above matched: usually “all fields filled” with no marble / no lighting gap / no dark pair.
  if (sentences.length === 0) {
    if (items.length === 0) {
      return 'No materials or furniture fields are defined for this room.'
    }
    return `Your ${lowerRoom} selections are complete. The mock summary did not flag higher-cost materials, lighting gaps, a darker room, or missing items.`
  }

  return sentences.join(' ')
}
