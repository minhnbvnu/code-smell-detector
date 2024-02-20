function updateFormattedPrice(state, id) {
  state.cartDetails[id].formattedPrice = formatCurrencyString({
    value: state.cartDetails[id].price,
    currency: state.currency,
    language: state.language
  })
}