<script setup>
const ROOMS = ['Kitchen', 'Bathroom', 'Living Room', 'Bedroom', 'Laundry']

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <section class="card" aria-label="Room selector">
    <header class="header">
      <div>
        <p class="eyebrow">Selected room</p>
        <h1 class="selected">{{ modelValue }}</h1>
      </div>
    </header>

    <div class="controls">
      <label class="selectWrap">
        <span class="srOnly">Select a room</span>
        <select class="select" :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
          <option v-for="room in ROOMS" :key="room" :value="room">{{ room }}</option>
        </select>
      </label>

      <div class="buttons" role="group" aria-label="Quick room buttons">
        <button
          v-for="room in ROOMS"
          :key="room"
          type="button"
          class="btn"
          :data-active="room === modelValue"
          @click="$emit('update:modelValue', room)"
        >
          {{ room }}
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card {
  width: min(720px, calc(100vw - 32px));
  background: var(--panel);
  border: 1px solid var(--panel-border);
  border-radius: 18px;
  box-shadow: var(--shadow);
  backdrop-filter: blur(10px);
}

.header {
  padding: 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.eyebrow {
  margin: 0;
  color: var(--muted);
  font-size: 12px;
  letter-spacing: 0.3px;
  text-transform: uppercase;
}

.selected {
  margin: 8px 0 0;
  font-size: 22px;
  line-height: 1.15;
}

.controls {
  padding: 14px 18px 18px;
  display: grid;
  gap: 12px;
}

.selectWrap {
  display: block;
}

.select {
  width: 100%;
  height: 42px;
  border-radius: 14px;
  padding: 0 12px;
  background: rgba(0, 0, 0, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: rgba(255, 255, 255, 0.92);
  outline: none;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.btn {
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.92);
  padding: 10px 12px;
  border-radius: 14px;
  cursor: pointer;
  font-weight: 600;
  text-align: center;
}

.btn:hover {
  border-color: rgba(255, 255, 255, 0.28);
}

.btn[data-active='true'] {
  border-color: rgba(124, 92, 255, 0.65);
  background: rgba(124, 92, 255, 0.18);
}

.srOnly {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (min-width: 640px) {
  .buttons {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
