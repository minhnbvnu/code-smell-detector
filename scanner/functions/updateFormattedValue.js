function updateFormattedValue(state, id) {
  state.cartDetails[id].formattedValue = formatCurrencyString({
    value: state.cartDetails[id].value,
    currency: state.currency,
    language: state.language
  })
}