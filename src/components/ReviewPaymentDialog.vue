<template>
  <q-dialog v-model="dialog">
    <q-card style="width: 400px">
      <q-card-section class="text-center">
        <q-icon name="qr_code_scanner" size="xl" color="primary" />
        <div class="text-h6 q-mt-md text-grey-9">{{ $t('reviewDetailsWithPatient') }}</div>
        <p class="text-grey-7 q-mt-sm">
          {{ $t('reviewDetailsDescription') }}
        </p>
        <div class="text-h5 text-weight-bold q-mt-md text-grey-9">
          {{ $t('autoProcessingIn', { seconds: countdown }) }}
        </div>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn flat :label="$t('cancel')" color="primary" v-close-popup />
        <q-btn color="primary" :label="$t('processPayment')" @click="processPayment" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'
//import { useI18n } from 'vue-i18n'

// // const { t } = useI18n()

const props = defineProps({ modelValue: Boolean })
const emit = defineEmits(['update:modelValue', 'process'])

const dialog = ref(props.modelValue)
const countdown = ref(5)
let timer = null

watch(
  () => props.modelValue,
  (val) => {
    dialog.value = val
    if (val) {
      countdown.value = 5
      startCountdown()
    } else {
      stopCountdown()
    }
  },
)

watch(dialog, (val) => {
  emit('update:modelValue', val)
})

function startCountdown() {
  stopCountdown() // Clear any existing timer
  timer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    } else {
      stopCountdown()
      processPayment() // Auto-process when countdown reaches 0
    }
  }, 1000)
}

function stopCountdown() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

function processPayment() {
  emit('process')
  dialog.value = false
}

onUnmounted(() => {
  stopCountdown()
})
</script>
