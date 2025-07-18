<template>
  <q-select
    v-model="selectedLocation"
    :options="locations"
    :label="$t('location')"
    option-value="id"
    option-label="name"
    emit-value
    map-options
    filled
    @update:model-value="updateLocation"
  />
</template>

<script setup>
import { computed } from 'vue'
import { usePaymentStore } from 'src/stores/payment-store'
//import { useI18n } from 'vue-i18n'

// const { t } = useI18n()

const paymentStore = usePaymentStore()

const locations = computed(() => paymentStore.locations)
const selectedLocation = computed(() => paymentStore.selectedLocationId)

function updateLocation(locationId) {
  paymentStore.setLocation(locationId)
}
</script>
