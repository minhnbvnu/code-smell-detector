async function filterCart(cartDetails, filter) {
  const filteredCart = {}

  for (const sku in cartDetails) {
    const entry = cartDetails[sku]
    if (await filter(entry)) filteredCart[sku] = entry
  }

  return filteredCart
}