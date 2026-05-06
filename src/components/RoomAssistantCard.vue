<script setup>
import { computed, ref } from 'vue'

defineProps({
  roomName: {
    type: String,
    required: true,
  },
})

const status = ref('Idle')
const lastUpdated = ref(new Date())

function simulateUpdate() {
  status.value = status.value === 'Idle' ? 'Listening' : 'Idle'
  lastUpdated.value = new Date()
}

const lastUpdatedText = computed(() => lastUpdated.value.toLocaleString())
</script>

<template>
  <section class="card">
    <header class="header">
      <div>
        <h2 class="title">{{ roomName }}</h2>
        <p class="subtitle">FeelDx Room Assistant</p>
      </div>

      <span class="pill" :data-status="status">{{ status }}</span>
    </header>

    <div class="content">
      <dl class="meta">
        <div class="row">
          <dt>Last updated</dt>
          <dd>{{ lastUpdatedText }}</dd>
        </div>
      </dl>

      <button class="btn" type="button" @click="simulateUpdate">Simulate update</button>
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
  padding: 18px 18px 12px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.title {
  margin: 0;
  font-size: 18px;
  letter-spacing: 0.2px;
}

.subtitle {
  margin: 6px 0 0;
  color: var(--muted);
  font-size: 13px;
}

.pill {
  font-size: 12px;
  line-height: 1;
  padding: 8px 10px;
  border-radius: 999px;
  border: 1px solid var(--panel-border);
  color: rgba(255, 255, 255, 0.85);
  background: rgba(255, 255, 255, 0.06);
}

.pill[data-status='Listening'] {
  border-color: rgba(124, 92, 255, 0.65);
  background: rgba(124, 92, 255, 0.18);
}

.content {
  padding: 0 18px 18px;
}

.meta {
  margin: 0 0 14px;
}

.row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(0, 0, 0, 0.12);
}

dt {
  color: var(--muted);
  font-size: 12px;
}

dd {
  margin: 0;
  font-size: 13px;
}

.btn {
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: linear-gradient(180deg, rgba(124, 92, 255, 0.28), rgba(124, 92, 255, 0.18));
  color: rgba(255, 255, 255, 0.92);
  padding: 12px 14px;
  border-radius: 14px;
  font-weight: 600;
  cursor: pointer;
}

.btn:hover {
  border-color: rgba(124, 92, 255, 0.55);
}

.btn:active {
  transform: translateY(1px);
}
</style>
