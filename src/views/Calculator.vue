<template>
  <div class="app">
    <header>
      <h1>Gold Calculator</h1>
      <span class="status">LIVE</span>
    </header>

    <div class="price-card">
      <div>
        <h2>GOLD (AU)</h2>
        <p class="pair">PHP / GRAM</p>
      </div>
      <div class="price">₱{{ rate.toLocaleString() }}</div>
    </div>

    <div class="trade-card">
      <label>Weight (g)</label>
      <input type="number" v-model="weight" min="0" />

      <label>Purity</label>
      <div class="purity-radio-group">
        <label v-for="p in purities" :key="p.value" class="purity-radio">
          <input
            type="radio"
            v-model="purity"
            :value="p.value"
            name="purity"
          />
          {{ p.label }}
        </label>
      </div>

      <label>Design Fee (PHP)</label>
      <input type="number" v-model="designCharge" min="0" />

      <div class="divider"></div>

      <div class="summary">
        <div>
          <span>Base Price</span>
          <span>₱{{ basePrice.toFixed(2) }}</span>
        </div>
        <div>
          <span>VAT 12%</span>
          <span>₱{{ vat.toFixed(2) }}</span>
        </div>
        <div class="total">
          <span>Total</span>
          <span>₱{{ total.toFixed(2) }}</span>
        </div>
      </div>

      <button class="buy">GET QUOTE</button>

      <div class="calculation-summary">
        <h3>Calculation Summary</h3>
        <p>Weight: {{ weight }}g</p>
        <p>
          Purity:
          {{ purities.find((p) => p.value === purity)?.label }}
        </p>
        <p>Design Fee: ₱{{ designCharge }}</p>
        <p>Base Price: ₱{{ basePrice.toFixed(2) }}</p>
        <p>VAT (12%): ₱{{ vat.toFixed(2) }}</p>
        <p class="total-summary">Total: ₱{{ total.toFixed(2) }}</p>
      </div>
    </div>

    <p v-if="loading" class="loading">Updating price...</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const rate = ref(0)
const weight = ref(1)
const purity = ref(0.75)
const designCharge = ref(0)
const vatRate = 0.12
const loading = ref(false)

const purities = [
  { label: '24K', value: 0.999 },
  { label: '22K', value: 0.916 },
  { label: '18K', value: 0.75 },
  { label: '14K', value: 0.585 },
]

async function fetchRates() {
  loading.value = true
  // mock live price (replace with real API)
  rate.value = 4100
  loading.value = false
}

onMounted(fetchRates)

const basePrice = computed(() => rate.value * weight.value * purity.value)
const subtotal = computed(
  () => basePrice.value + Number(designCharge.value || 0),
)
const vat = computed(() => subtotal.value * vatRate)
const total = computed(() => subtotal.value + vat.value)
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.app {
  max-width: 420px;
  margin: auto;
  padding: 20px;
}

@media (max-width: 768px) {
  .app {
    padding: 15px;
    max-width: 100%;
  }
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status {
  color: #0ecb81;
  font-weight: bold;
  font-size: 12px;
}

.price-card {
  margin-top: 16px;
  padding: 20px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #ffffff, #f9f9f9);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  position: relative;
}

.price-card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(135deg, #f0b90b, #f8d12f);
  border-radius: 12px 0 0 12px;
}

.price {
  font-size: 1.6rem;
  font-weight: 700;
  color: #f0b90b;
}

.pair {
  font-size: 12px;
  color: #848e9c;
}

.trade-card {
  background: linear-gradient(135deg, #ffffff, #f9f9f9);
  padding: 20px;
  margin-top: 16px;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

label {
  font-size: 12px;
  color: #848e9c;
  margin-top: 12px;
  display: block;
}

input,
select {
  width: 100%;
  margin-top: 6px;
  padding: 10px;
  background: #ffffff;
  color: #333;
  border: 1px solid #e1e5e9;
  border-radius: 6px;
  transition: border-color 0.3s ease;
}

input:focus,
select:focus {
  outline: none;
  border-color: #f0b90b;
  box-shadow: 0 0 0 2px rgba(240, 185, 11, 0.1);
}

.purity-radio-group {
  margin-top: 6px;
  display: flex;
  flex-direction: row;
  gap: 16px;
  flex-wrap: wrap;
}

.purity-radio {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333;
  cursor: pointer;
}

.purity-radio input[type='radio'] {
  margin-right: 8px;
  accent-color: #f0b90b;
}

.divider {
  height: 1px;
  background: rgba(43, 49, 57, 0.5);
  margin: 16px 0;
}

.summary div {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}

.summary .total {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0ecb81;
}

.buy {
  margin-top: 16px;
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #f0b90b, #f8d12f);
  border: none;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  color: #000;
  box-shadow: 0 4px 15px rgba(240, 185, 11, 0.3);
}

.buy:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.calculation-summary {
  margin-top: 16px;
}

.total-summary {
  font-weight: 700;
}

.loading {
  text-align: center;
  color: #848e9c;
  margin-top: 10px;
}
</style>

