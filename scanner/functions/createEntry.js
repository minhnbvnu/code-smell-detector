function createEntry({
  state,
  id,
  product,
  count,
  price_metadata,
  product_metadata
}) {
  const entry = Entry({
    id,
    product,
    quantity: count,
    price_metadata,
    product_metadata,
    timestamp: formatISO(new Date())
  })

  state.cartDetails[id] = entry
  updateFormattedValue(state, id)
  updateFormattedPrice(state, id)

  state.totalPrice += entry.value
  state.cartCount += count
  updateFormattedTotalPrice(state)
}