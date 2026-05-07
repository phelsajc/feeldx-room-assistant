<script setup>
import { computed, watchEffect } from 'vue'
import { MATERIAL_OPTIONS, ROOM_ITEMS, roomIdFromLabel } from '../data/rooms'

const selectOptions = MATERIAL_OPTIONS.filter((o) => o.value !== '')

const props = defineProps({
  room: {
    type: String,
    required: true,
  },
  /** Keyed by room id (e.g. kitchen): { flooring: 'marble', ... } */
  selections: {
    type: Object,
    required: true,
  },
})

const roomId = computed(() => roomIdFromLabel(props.room))
const items = computed(() => (roomId.value ? ROOM_ITEMS[roomId.value] ?? [] : []))

function ensureRoomSelections() {
  const id = roomId.value
  if (!id) return
  if (!props.selections[id]) props.selections[id] = {}
  for (const item of items.value) {
    if (props.selections[id][item.key] === undefined) props.selections[id][item.key] = ''
  }
}

watchEffect(() => {
  ensureRoomSelections()
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
      <p v-if="!roomId || items.length === 0" class="text-sm text-slate-500">No selections defined for this room yet.</p>

      <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label v-for="item in items" :key="item.key" class="grid gap-1.5">
          <span class="text-xs font-semibold text-slate-700">{{ item.label }}</span>
          <select
            class="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
            :value="selections[roomId]?.[item.key] ?? ''"
            @change="selections[roomId][item.key] = $event.target.value"
          >
            <option value="" disabled>Select</option>
            <option v-for="opt in selectOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
          </select>
        </label>
      </div>
    </div>
  </section>
</template>
