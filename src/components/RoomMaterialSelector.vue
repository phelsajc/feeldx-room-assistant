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
  <section
    class="w-full rounded-[18px] border border-white/10 bg-white/5 shadow-[var(--shadow)] backdrop-blur-[10px]"
    aria-label="Material and furniture selector"
  >
    <header class="flex items-baseline justify-between gap-3 border-b border-white/10 p-4 sm:p-[18px]">
      <div>
        <p class="text-xs uppercase tracking-[0.3px] text-white/70">Materials & furniture</p>
        <h2 class="mt-2 text-lg font-semibold tracking-[0.2px] text-white/90">{{ room }}</h2>
      </div>
    </header>

    <div class="p-4 sm:px-[18px] sm:pb-[18px] sm:pt-[14px]">
      <p v-if="fieldsForRoom.length === 0" class="text-sm text-white/70">No selections defined for this room yet.</p>

      <div v-else class="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label v-for="field in fieldsForRoom" :key="field" class="grid gap-1.5">
          <span class="text-xs text-white/70">{{ field }}</span>
          <select
            class="h-[42px] w-full rounded-[14px] border border-white/15 bg-black/20 px-3 text-white/90 outline-none focus:border-white/25"
            :value="selections[room]?.[field] ?? ''"
            @change="selections[room][field] = $event.target.value"
          >
            <option value="" disabled>Select {{ field }}</option>
            <option v-for="opt in OPTIONS[field] ?? []" :key="opt" :value="opt">{{ opt }}</option>
          </select>
        </label>
      </div>
    </div>
  </section>
</template>
