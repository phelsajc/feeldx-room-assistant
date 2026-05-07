/**
 * isDark used for “room may feel darker” rule.
 */
export const MATERIAL_OPTIONS = [
  { value: '', label: '— Select —', isDark: false },
  { value: 'wood', label: 'Wood', isDark: false },
  { value: 'dark-wood', label: 'Dark wood', isDark: true },
  { value: 'marble', label: 'Marble', isDark: false },
  { value: 'tile', label: 'Tile', isDark: false },
  { value: 'dark-tile', label: 'Dark tile / slate', isDark: true },
  { value: 'fabric', label: 'Fabric', isDark: false },
  { value: 'leather', label: 'Leather', isDark: false },
  { value: 'granite', label: 'Granite', isDark: false },
  { value: 'quartz', label: 'Quartz', isDark: false },
  { value: 'painted', label: 'Painted finish', isDark: false },
  { value: 'matte-black', label: 'Matte black', isDark: true },
  { value: 'glass', label: 'Glass / mirror', isDark: false },
  { value: 'vinyl', label: 'Vinyl / LVT', isDark: false },
  { value: 'ceramic', label: 'Ceramic', isDark: false },
  { value: 'laminate', label: 'Laminate', isDark: false },
]

export const ROOM_TYPES = [
  { id: 'kitchen', label: 'Kitchen' },
  { id: 'bathroom', label: 'Bathroom' },
  { id: 'living', label: 'Living Room' },
  { id: 'bedroom', label: 'Bedroom' },
  { id: 'laundry', label: 'Laundry' },
]

/**
 * lightingKey marks the field used for lighting rule (if present in room).
 */
export const ROOM_ITEMS = {
  kitchen: [
    { key: 'flooring', label: 'Flooring' },
    { key: 'wallFinish', label: 'Wall Finish' },
    { key: 'benchtop', label: 'Benchtop' },
    { key: 'cabinetry', label: 'Cabinetry' },
  ],
  bathroom: [
    { key: 'flooring', label: 'Flooring' },
    { key: 'wallFinish', label: 'Wall finish / tiles' },
    { key: 'vanity', label: 'Vanity' },
    { key: 'fixtures', label: 'Fixtures' },
  ],
  living: [
    { key: 'sofa', label: 'Sofa' },
    { key: 'table', label: 'Table' },
    { key: 'lighting', label: 'Lighting' },
    { key: 'flooring', label: 'Flooring' },
  ],
  bedroom: [
    { key: 'bed', label: 'Bed' },
    { key: 'lighting', label: 'Lighting' },
    { key: 'flooring', label: 'Flooring' },
    { key: 'wallFinish', label: 'Wall Finish' },
  ],
  laundry: [
    { key: 'flooring', label: 'Flooring' },
    { key: 'cabinetry', label: 'Cabinetry' },
    { key: 'benchtop', label: 'Benchtop' },
    { key: 'appliances', label: 'Appliances finish' },
  ],
}

export const LIGHTING_KEYS = new Set(['lighting', 'fixtures'])

export const FLOORING_KEY = 'flooring'
export const WALL_KEY = 'wallFinish'

/**
 * Maps UI room button label → ROOM_ITEMS key (e.g. "Kitchen" → "kitchen").
 * @param {string} label
 */
export function roomIdFromLabel(label) {
  return ROOM_TYPES.find((r) => r.label === label)?.id ?? null
}

/**
 * Human-readable label for a stored MATERIAL_OPTIONS value (or Passthrough unknown).
 * @param {string} value
 */
export function materialLabelForValue(value) {
  if (!value) return ''
  const opt = MATERIAL_OPTIONS.find((o) => o.value === value)
  return opt?.label ?? value
}
