<script setup>
import { computed, ref } from 'vue'
import { materialLabelForValue, roomIdFromLabel, ROOM_ITEMS } from '../data/rooms'
import { estimateRoomMaterialsCost } from '../utils/estimateRoomCost'
import { generateAiSummary } from '../utils/generateAiSummary'

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

const roomId = computed(() => roomIdFromLabel(props.room))
const items = computed(() => (roomId.value ? ROOM_ITEMS[roomId.value] ?? [] : []))
const roomSelections = computed(() =>
  roomId.value && props.selections[roomId.value] ? props.selections[roomId.value] : {},
)

const costEstimate = computed(() => estimateRoomMaterialsCost(roomSelections.value, items.value))

function formatUsd(n) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n)
}

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
        <p class="text-xs font-semibold text-slate-700">Estimated cost (this room)</p>
        <p class="mt-1 text-xs text-slate-500">
          Mock per-item ranges; updates as you change selections. Only counts filled fields.
        </p>
        <div class="mt-2 rounded-lg border border-slate-200 bg-emerald-50/60 px-4 py-3">
          <div class="flex flex-wrap items-baseline justify-between gap-2">
            <span class="text-xs font-semibold text-slate-700">Total</span>
            <span class="text-lg font-bold text-emerald-800">{{ formatUsd(costEstimate.total) }}</span>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <p class="text-xs font-semibold text-slate-700">Selected materials / furniture</p>

        <ul v-if="items.length" class="mt-2 divide-y divide-slate-200 overflow-hidden rounded-lg border border-slate-200">
          <li v-for="line in costEstimate.lines" :key="line.key" class="flex flex-col gap-1 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div class="min-w-0">
              <span class="text-sm font-medium text-slate-800">{{ line.label }}</span>
              <p
                class="text-sm"
                :class="line.value ? 'text-slate-900' : 'text-slate-400'"
              >
                {{ displayValue(roomSelections[line.key]) }}
              </p>
            </div>
            <span class="shrink-0 text-sm tabular-nums text-slate-600">
              {{ line.value ? formatUsd(line.lineCost) : 'Not selected' }}
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
