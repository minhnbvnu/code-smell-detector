function updateFormattedTotalPrice(state) {
  state.formattedTotalPrice = formatCurrencyString({
    value: state.totalPrice,
    currency: state.currency,
    language: state.language
  })
}