function removeEntry({ state, id }) {
  const cartDetails = state.cartDetails
  state.totalPrice -= cartDetails[id].value
  state.cartCount -= cartDetails[id].quantity
  delete cartDetails[id]
  updateFormattedTotalPrice(state)
}