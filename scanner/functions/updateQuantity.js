function updateQuantity({ state, id, quantity }) {
  const entry = state.cartDetails[id]
  updateEntry({
    state,
    id,
    count: quantity - entry.quantity
  })
}