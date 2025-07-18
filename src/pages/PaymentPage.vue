<template>
  <q-page class="" :class="$q.screen.lt.md ? 'q-pa-md' : 'column bg-grey-2'">
    <!-- Top Header for both PC and Mobile -->
    <div class="row full-width" :class="$q.screen.lt.md ? 'q-px-md q-pt-md' : 'q-px-sm q-pt-sm'">
      <div class="col-auto text-h5 text-grey-9">Collect Payment</div>
      <div class="col-grow q-mx-md">
        <LocationSelector />
      </div>
      <div class="col-auto">
        <q-btn flat label="Reset Payment" color="negative" @click="resetPayment" />
      </div>
    </div>

    <!-- Main Content (Left Side) -->
    <div class="row col justify-center">
      <div :class="$q.screen.lt.md ? '' : 'col-7 q-pa-xl'">
        <q-input
          v-model.number="paymentAmount"
          type="number"
          class="text-h2 text-weight-bold text-grey-9 no-padding amount-input"
          @update:model-value="updatePaymentAmount"
        />
        <q-input
          v-model="description"
          label="Description (Optional)"
          class="q-mt-md description-input"
          type="textarea"
        />
      </div>

      <!-- Right Side -->
      <div :class="$q.screen.lt.md ? 'q-mt-xl' : 'col-5 q-pa-xl bg-white'">
        <PaymentSummary />
        <q-btn flat color="primary" label="Edit" class="q-mt-md" @click="showFeeDialog = true" />

        <div class="q-mt-xl">
          <div class="text-subtitle1 text-grey-9">Pay by Card Total</div>
          <div class="text-h4 text-weight-bold text-grey-9 q-mb-md">
            ${{ totalAmount.toFixed(2) }}
          </div>
          <LocationSelector v-if="!$q.screen.lt.md" class="q-mb-md" />
          <CardPaymentForm />
        </div>
      </div>
    </div>

    <ProcessingFeeDialog v-model="showFeeDialog" />
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import { usePaymentStore } from 'src/stores/payment-store'
import LocationSelector from 'src/components/LocationSelector.vue'
import PaymentSummary from 'src/components/PaymentSummary.vue'
import ProcessingFeeDialog from 'src/components/ProcessingFeeDialog.vue'
import CardPaymentForm from 'src/components/CardPaymentForm.vue'

const $q = useQuasar()
const paymentStore = usePaymentStore()

const showFeeDialog = ref(false)
const description = ref('')

const paymentAmount = computed(() => paymentStore.paymentAmount)
const totalAmount = computed(() => paymentStore.totalAmount)

function updatePaymentAmount(amount) {
  paymentStore.setPaymentAmount(amount)
}

function resetPayment() {
  paymentStore.setPaymentAmount(0)
  paymentStore.setLocation(paymentStore.locations[0].id) // Reset to first location
  description.value = ''
}
</script>

<style lang="scss" scoped>
.no-padding .q-field__control {
  padding: 0;
}

.amount-input {
  .q-field__control {
    height: auto;
    min-height: unset;
  }
  .q-field__native {
    font-size: var(--font-size-7xl);
    font-weight: bold;
    color: var(--gray-900);
  }
}

.description-input {
  .q-field__control {
    height: auto;
    min-height: unset;
  }
  .q-field__native {
    font-size: var(--font-size-md);
    color: var(--gray-700);
  }
}
</style>
