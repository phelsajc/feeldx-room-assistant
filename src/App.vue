<script setup>
import { ref } from 'vue'
import RoomAssistantCard from './components/RoomAssistantCard.vue'
import RoomSelector from './components/RoomSelector.vue'

const selectedRoom = ref('Living Room')
</script>

<template>
  <main class="page">
    <div class="stack">
      <RoomSelector v-model="selectedRoom" />
      <RoomAssistantCard :room-name="selectedRoom" />
    </div>
  </main>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 32px 16px;
}

.stack {
  width: min(720px, calc(100vw - 32px));
  display: grid;
  gap: 14px;
}
</style>
