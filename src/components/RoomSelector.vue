<script setup>
import { ROOM_TYPES } from '../data/rooms'

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <section class="rounded-xl border border-slate-200 bg-white shadow-sm" aria-label="Room selector">
    <header class="px-6 pb-3 pt-5">
      <h2 class="text-sm font-semibold text-slate-900">1. Room</h2>
      <p class="mt-1 text-xs text-slate-500">Select the room you are planning.</p>
    </header>

    <div class="px-6 pb-6">
      <div class="flex flex-wrap gap-2" role="group" aria-label="Quick room buttons">
        <button
          v-for="r in ROOM_TYPES"
          :key="r.id"
          type="button"
          class="rounded-lg border px-3 py-2 text-xs font-semibold transition"
          :class="
            r.label === modelValue
              ? 'border-emerald-600 bg-emerald-600 text-white shadow-sm'
              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
          "
          @click="$emit('update:modelValue', r.label)"
        >
          {{ r.label }}
        </button>
      </div>
    </div>
  </section>
</template>
