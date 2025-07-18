<template>
  <div>
    <q-select
      v-model="selectedReader"
      :options="availableReaders"
      :label="$t('deviceReader')"
      option-value="id"
      option-label="label"
      emit-value
      map-options
      filled
      class="q-mb-md"
    />

    <q-btn
      outline
      color="primary"
      :label="$t('inputCardNumberManually')"
      class="full-width"
      @click="showCardInputDialog = true"
    />

    <q-dialog v-model="showCardInputDialog">
      <q-card style="width: 500px">
        <q-card-section>
          <div class="text-h6">{{ $t('creditCardDetails') }}</div>
        </q-card-section>
        <q-card-section>
          <q-input v-model="cardNumber" :label="$t('cardNumber')" filled />
          <div class="row q-mt-md">
            <q-input
              v-model="expiryDate"
              :label="$t('expirationDate')"
              filled
              class="col q-mr-sm"
            />
            <q-input v-model="cvv" :label="$t('cvc')" filled class="col q-ml-sm" />
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat :label="$t('cancel')" color="primary" v-close-popup />
          <q-btn
            flat
            :label="$t('pay')"
            color="primary"
            @click="processManualPayment"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-btn
      color="primary"
      :label="$t('initiatePaymentOnReader')"
      class="full-width q-mt-lg"
      :disable="!selectedReader"
      @click="showReviewDialog = true"
    />

    <ReviewPaymentDialog v-model="showReviewDialog" @process="processReaderPayment" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { usePaymentStore } from 'src/stores/payment-store'
import ReviewPaymentDialog from './ReviewPaymentDialog.vue'
//import { useI18n } from 'vue-i18n'

// const { t } = useI18n()

const paymentStore = usePaymentStore()

const availableReaders = computed(() => paymentStore.availableReaders)
const selectedReader = ref(null)

const showCardInputDialog = ref(false)
const cardNumber = ref('')
const expiryDate = ref('')
const cvv = ref('')

const showReviewDialog = ref(false)

function processManualPayment() {
  // Handle manual payment logic here
  console.log('Processing manual payment...')
}

function processReaderPayment() {
  // Handle reader payment logic here
  console.log('Processing reader payment...')
}
</script>
