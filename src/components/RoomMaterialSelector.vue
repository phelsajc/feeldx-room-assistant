<script setup>
import { computed, watchEffect } from 'vue'

const ROOM_FIELDS = {
  Kitchen: ['Flooring', 'Wall Finish', 'Benchtop', 'Cabinetry'],
  'Living Room': ['Sofa', 'Table', 'Lighting', 'Flooring'],
  Bedroom: ['Bed', 'Lighting', 'Flooring', 'Wall Finish'],
}

const OPTIONS = {
  Flooring: ['Tile', 'Wood', 'Vinyl', 'Laminate', 'Marble'],
  'Wall Finish': ['Paint', 'Wallpaper', 'Tile', 'Wood Panel', 'Plaster'],
  Benchtop: ['Quartz', 'Granite', 'Marble', 'Laminate', 'Stainless Steel'],
  Cabinetry: ['Wood', 'Laminate', 'Matte', 'Gloss', 'Glass'],

  Sofa: ['Fabric', 'Leather', 'Velvet', 'Linen'],
  Table: ['Wood', 'Glass', 'Marble', 'Metal'],
  Lighting: ['Pendant', 'Recessed', 'Floor Lamp', 'Wall Sconce', 'Chandelier'],
  Bed: ['Upholstered', 'Wood', 'Metal', 'Storage'],
}

const props = defineProps({
  room: {
    type: String,
    required: true,
  },
  selections: {
    type: Object,
    required: true,
  },
})

// selections[room][field] = option
function ensureRoom(room) {
  if (!props.selections[room]) props.selections[room] = {}
  for (const field of ROOM_FIELDS[room] ?? []) {
    if (props.selections[room][field] === undefined) props.selections[room][field] = ''
  }
}

const fieldsForRoom = computed(() => ROOM_FIELDS[props.room] ?? [])

watchEffect(() => {
  ensureRoom(props.room)
})
</script>

<template>
  <section class="rounded-xl border border-slate-200 bg-white shadow-sm" aria-label="Material and furniture selector">
    <header class="px-6 pb-3 pt-5">
      <h2 class="text-sm font-semibold text-slate-900">2. Materials & furniture</h2>
      <p class="mt-1 text-xs text-slate-500">
        Options update for the selected room. Each field uses the same palette (wood, marble, tile, fabric, and more).
      </p>
    </header>

    <div class="px-6 pb-6">
      <p v-if="fieldsForRoom.length === 0" class="text-sm text-slate-500">No selections defined for this room yet.</p>

      <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label v-for="field in fieldsForRoom" :key="field" class="grid gap-1.5">
          <span class="text-xs font-semibold text-slate-700">{{ field }}</span>
          <select
            class="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
            :value="selections[room]?.[field] ?? ''"
            @change="selections[room][field] = $event.target.value"
          >
            <option value="" disabled>Select</option>
            <option v-for="opt in OPTIONS[field] ?? []" :key="opt" :value="opt">{{ opt }}</option>
          </select>
        </label>
      </div>
    </div>
  </section>
</template>
