<script setup>
import { computed } from 'vue'

const ROOM_FIELDS = {
  Kitchen: ['Flooring', 'Wall Finish', 'Benchtop', 'Cabinetry'],
  'Living Room': ['Sofa', 'Table', 'Lighting', 'Flooring'],
  Bedroom: ['Bed', 'Lighting', 'Flooring', 'Wall Finish'],
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

const fields = computed(() => ROOM_FIELDS[props.room] ?? [])
const roomSelections = computed(() => props.selections?.[props.room] ?? {})
</script>

<template>
  <section class="rounded-xl border border-slate-200 bg-white shadow-sm" aria-label="Summary panel">
    <header class="px-6 pb-3 pt-5">
      <h2 class="text-sm font-semibold text-slate-900">3. Summary</h2>
      <p class="mt-1 text-xs text-slate-500">Review your current selections. Updates in real time.</p>
    </header>

    <div class="px-6 pb-6">
      <div class="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
        <p class="text-xs font-semibold text-slate-700">Selected Room</p>
        <p class="mt-1 text-sm text-slate-900">{{ room }}</p>
      </div>

      <div class="mt-4">
        <p class="text-xs font-semibold text-slate-700">Selected materials / furniture</p>

        <ul v-if="fields.length" class="mt-2 divide-y divide-slate-200 overflow-hidden rounded-lg border border-slate-200">
          <li v-for="field in fields" :key="field" class="flex items-center justify-between gap-4 bg-white px-4 py-3">
            <span class="text-sm font-medium text-slate-800">{{ field }}</span>
            <span
              class="text-sm"
              :class="roomSelections[field] ? 'text-slate-900' : 'text-slate-400'"
            >
              {{ roomSelections[field] || 'Not selected' }}
            </span>
          </li>
        </ul>

        <p v-else class="mt-2 text-sm text-slate-500">No summary available for this room yet.</p>
      </div>
    </div>
  </section>
</template>

