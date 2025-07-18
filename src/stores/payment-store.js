
import { defineStore } from 'pinia';

export const usePaymentStore = defineStore('payment', {
  state: () => ({
    // Mock Data from spec.pdf
    organization: {
      id: 4,
      name: 'Nitra Clinic',
      totalProcessingFeeFixed: 10,
      totalProcessingFeePercentage: 0.035,
    },
    locations: [
      {
        id: 48,
        name: 'New York Clinic',
        taxRate: 0.045,
      },
      {
        id: 75,
        name: 'Los Angeles Clinic',
        taxRate: 0.045, // Assuming same tax rate as per spec
      },
    ],
    paymentReaders: [
      { id: 23, label: 'Device Reader 01', readerId: 'tmr_00000001582624', status: 'online', locationId: 48 },
      { id: 27, label: 'Device Reader 02', readerId: 'tmr_00000001582658', status: 'offline', locationId: 48 },
      { id: 35, label: 'Device Reader 03', readerId: 'tmr_00000001582824', status: 'online', locationId: 48 },
      { id: 63, label: 'Device Reader 04', readerId: 'tmr_00000001604858', status: 'online', locationId: 48 },
      { id: 58, label: 'Device Reader 01', readerId: 'tmr_00000001604824', status: 'online', locationId: 75 },
      { id: 71, label: 'Device Reader 02', readerId: 'tmr_00000001630824', status: 'online', locationId: 75 },
    ],

    // App State
    paymentAmount: 100.00,
    selectedLocationId: 48,
    paymentMethod: 'card', // 'card' or 'cash'

    // Processing Fee State
    merchantFixedFee: 5.00,
    merchantPercentageFee: 0.02, // 2%
    patientFixedFee: 5.00,
    patientPercentageFee: 0.015, // 1.5%
  }),

  getters: {
    selectedLocation(state) {
      return state.locations.find(loc => loc.id === state.selectedLocationId);
    },
    availableReaders(state) {
      return state.paymentReaders.filter(reader => reader.locationId === state.selectedLocationId && reader.status === 'online');
    },
    taxAmount(state) {
      if (!this.selectedLocation) return 0;
      return state.paymentAmount * this.selectedLocation.taxRate;
    },
    processingFee(state) {
      if (state.paymentMethod === 'cash') {
        return 0;
      }
      const totalFixed = state.merchantFixedFee + state.patientFixedFee;
      const totalPercentage = state.merchantPercentageFee + state.patientPercentageFee;
      return totalFixed + (state.paymentAmount * totalPercentage);
    },
    totalAmount(state) {
      return state.paymentAmount + this.taxAmount + this.processingFee;
    }
  },

  actions: {
    setLocation(locationId) {
      this.selectedLocationId = locationId;
    },
    setPaymentAmount(amount) {
      this.paymentAmount = parseFloat(amount) || 0;
    },
    setPaymentMethod(method) {
      this.paymentMethod = method;
    },
    updateProcessingFees({ merchantFixed, merchantPercentage, patientFixed, patientPercentage }) {
      this.merchantFixedFee = parseFloat(merchantFixed) || 0;
      this.merchantPercentageFee = (parseFloat(merchantPercentage) / 100) || 0;
      this.patientFixedFee = parseFloat(patientFixed) || 0;
      this.patientPercentageFee = (parseFloat(patientPercentage) / 100) || 0;
    }
  },
});
