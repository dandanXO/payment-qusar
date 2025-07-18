<template>
  <q-dialog v-model="dialog">
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="text-h6 text-grey-9">{{ $t('editMerchantProcessingFee') }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1 q-mb-sm text-grey-7">
          {{ $t('onlyAppliesToThisTransaction') }}
        </div>

        <!-- Total Processing Fee Section -->
        <div class="row items-center">
          <div class="col-3 text-grey-9">{{ $t('merchantProcessingFee') }}</div>
          <div class="col-9 row">
            <q-input
              v-model.number="fees.totalPercentage"
              filled
              dense
              class="col q-mr-sm"
              type="number"
              suffix="%"
            />
            <q-input
              v-model.number="fees.totalFixed"
              filled
              dense
              class="col q-ml-sm"
              type="number"
              prefix="$"
            />
          </div>
        </div>
        <div class="q-mt-md">
          <q-slider
            v-model="fees.totalPercentage"
            :min="0"
            :max="3.5"
            :step="0.01"
            label
            :label-value="fees.totalPercentage.toFixed(2) + '%'"
            color="primary"
          />
        </div>

        <!-- Patient Processing Fee Section -->
        <div class="row items-center q-mt-md">
          <div class="col-3 text-grey-9">{{ $t('patientProcessingFee') }}</div>
          <div class="col-9 row">
            <q-input
              v-model.number="fees.patientPercentage"
              filled
              dense
              class="col q-mr-sm"
              type="number"
              suffix="%"
            />
            <q-input
              v-model.number="fees.patientFixed"
              filled
              dense
              class="col q-ml-sm"
              type="number"
              prefix="$"
            />
          </div>
        </div>
        <div class="q-mt-md">
          <q-slider
            v-model="fees.patientPercentage"
            :min="0"
            :max="3.5"
            :step="0.01"
            label
            :label-value="fees.patientPercentage.toFixed(2) + '%'"
            color="primary"
          />
        </div>
      </q-card-section>

      <q-card-section class="text-grey-7">
        {{
          $t('onThisTransactionYouPay', {
            amount: paymentAmount.toFixed(2),
            merchantFee: merchantFee.toFixed(2),
            patientFee: patientFee.toFixed(2),
          })
        }}
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat :label="$t('cancel')" color="primary" v-close-popup />
        <q-btn color="primary" :label="$t('update')" @click="saveFees" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { usePaymentStore } from 'src/stores/payment-store'
//import { useI18n } from 'vue-i18n'

// // const { t } = useI18n()

const props = defineProps({ modelValue: Boolean })
const emit = defineEmits(['update:modelValue'])

const paymentStore = usePaymentStore()
const dialog = ref(props.modelValue)

const fees = ref({
  totalFixed: paymentStore.organization.totalProcessingFeeFixed,
  totalPercentage: paymentStore.organization.totalProcessingFeePercentage * 100,
  patientFixed: paymentStore.patientFixedFee,
  patientPercentage: paymentStore.patientPercentageFee * 100,
})

const paymentAmount = computed(() => paymentStore.paymentAmount)

const merchantFee = computed(() => {
  const totalFee = fees.value.totalFixed + paymentAmount.value * (fees.value.totalPercentage / 100)
  const patientPortion =
    fees.value.patientFixed + paymentAmount.value * (fees.value.patientPercentage / 100)
  return totalFee - patientPortion
})

const patientFee = computed(() => {
  return fees.value.patientFixed + paymentAmount.value * (fees.value.patientPercentage / 100)
})

watch(
  () => props.modelValue,
  (val) => {
    dialog.value = val
  },
)
watch(dialog, (val) => {
  emit('update:modelValue', val)
})

function saveFees() {
  paymentStore.updateProcessingFees({
    merchantFixed: fees.value.totalFixed - fees.value.patientFixed,
    merchantPercentage: fees.value.totalPercentage - fees.value.patientPercentage,
    patientFixed: fees.value.patientFixed,
    patientPercentage: fees.value.patientPercentage,
  })
}
</script>
