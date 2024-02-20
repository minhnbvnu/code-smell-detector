function updateEntry({
  state,
  id,
  count,
  price_metadata,
  product_metadata
}) {
  const entry = state.cartDetails[id]
  if (entry.quantity + count <= 0) return removeEntry({ state, id })

  state.cartDetails[id] = Entry({
    id,
    state,
    product: entry,
    quantity: entry.quantity + count,
    price_metadata,
    product_metadata
  })
  updateFormattedValue(state, id)

  state.totalPrice += entry.price * count
  state.cartCount += count
  updateFormattedTotalPrice(state)
}