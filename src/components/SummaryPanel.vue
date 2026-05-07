<script setup>
import { computed, ref } from 'vue'
import { materialLabelForValue, roomIdFromLabel, ROOM_ITEMS } from '../data/rooms'
import { generateAiSummary } from '../utils/generateAiSummary'

const props = defineProps({
  room: {
    type: String,
    required: true,
  },
  /** Keyed by room id: selections.kitchen.flooring etc. */
  selections: {
    type: Object,
    required: true,
  },
})

const roomId = computed(() => roomIdFromLabel(props.room))
const items = computed(() => (roomId.value ? ROOM_ITEMS[roomId.value] ?? [] : []))
const roomSelections = computed(() =>
  roomId.value && props.selections[roomId.value] ? props.selections[roomId.value] : {},
)

const generated = ref('')

function displayValue(raw) {
  return raw ? materialLabelForValue(raw) : 'Not selected'
}

function runGenerateAiSummary() {
  generated.value = generateAiSummary(props.room, roomSelections.value, items.value)
}
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

        <ul v-if="items.length" class="mt-2 divide-y divide-slate-200 overflow-hidden rounded-lg border border-slate-200">
          <li v-for="item in items" :key="item.key" class="flex items-center justify-between gap-4 bg-white px-4 py-3">
            <span class="text-sm font-medium text-slate-800">{{ item.label }}</span>
            <span
              class="text-sm"
              :class="roomSelections[item.key] ? 'text-slate-900' : 'text-slate-400'"
            >
              {{ displayValue(roomSelections[item.key]) }}
            </span>
          </li>
        </ul>

        <p v-else class="mt-2 text-sm text-slate-500">No summary available for this room yet.</p>
      </div>

      <div class="mt-5">
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-emerald-500/10"
          @click="runGenerateAiSummary"
        >
          Generate AI Summary
        </button>

        <div v-if="generated" class="mt-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
          <p class="text-sm leading-relaxed text-slate-800">{{ generated }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
