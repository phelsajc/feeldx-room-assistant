<script setup>
import { reactive, ref } from 'vue'
import RoomMaterialSelector from './components/RoomMaterialSelector.vue'
import RoomSelector from './components/RoomSelector.vue'
import SummaryPanel from './components/SummaryPanel.vue'
import { ROOM_TYPES } from './data/rooms'

const selectedRoom = ref(ROOM_TYPES[0].label)
/** Per-room keyed by ROOM_TYPES id — see src/data/rooms.js */
const selections = reactive({})
</script>

<template>
  <main class="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center px-4 py-10 sm:py-12">
    <header class="text-center">
      <h1 class="text-2xl font-extrabold leading-tight text-slate-900 sm:text-3xl">
        Room Materials & Furniture Selection<br />Assistant
      </h1>
      <p class="mx-auto mt-3 max-w-xl text-sm text-slate-500">
        Pick a space, choose finishes and pieces, then generate a quick mocked AI readout — all in the browser.
      </p>
    </header>

    <section class="mt-8 w-full space-y-5">
      <RoomSelector v-model="selectedRoom" />
      <RoomMaterialSelector :room="selectedRoom" :selections="selections" />
      <SummaryPanel :room="selectedRoom" :selections="selections" />
    </section>
  </main>
</template>
