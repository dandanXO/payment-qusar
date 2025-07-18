<template>
  <div>
    <div class="text-h6 text-grey-9">{{ $t('summary') }}</div>
    <div class="row justify-between q-mt-md text-grey-9">
      <span>{{ $t('subtotal') }}</span>
      <span>{{ formattedPaymentAmount }}</span>
    </div>
    <div class="row justify-between text-grey-9">
      <span>{{ $t('tax', { rate: formattedTaxRate }) }}</span>
      <span>{{ formattedTaxAmount }}</span>
    </div>
    <div class="row justify-between text-grey-9">
      <span>{{ $t('patientCardProcessingFee') }}</span>
      <span>{{ formattedProcessingFee }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { usePaymentStore } from 'src/stores/payment-store'
//import { useI18n } from 'vue-i18n'

// // const { t } = useI18n()

const paymentStore = usePaymentStore()

const formattedPaymentAmount = computed(() => `${paymentStore.paymentAmount.toFixed(2)}`)
const formattedTaxAmount = computed(() => `${paymentStore.taxAmount.toFixed(2)}`)
const formattedProcessingFee = computed(() => `${paymentStore.processingFee.toFixed(2)}`)
const formattedTaxRate = computed(() => {
  if (!paymentStore.selectedLocation) return '0%'
  return `${(paymentStore.selectedLocation.taxRate * 100).toFixed(2)}%`
})
</script>
