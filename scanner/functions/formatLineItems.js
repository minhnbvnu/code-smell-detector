function formatLineItems(cartDetails) {
  const lineItems = []
  for (const id in cartDetails)
    lineItems.push({ price: id, quantity: cartDetails[id].quantity })

  return lineItems
}