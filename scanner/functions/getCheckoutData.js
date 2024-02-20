function getCheckoutData(cart) {
  const lineItems = []
  for (const sku in cart.cartDetails)
    lineItems.push({ price: sku, quantity: cart.cartDetails[sku].quantity })

  const options = {
    mode: cart.mode,
    lineItems,
    successUrl: cart.successUrl,
    cancelUrl: cart.cancelUrl,
    billingAddressCollection: cart.billingAddressCollection
      ? 'required'
      : 'auto',
    submitType: 'auto'
  }

  if (cart.allowedCountries?.length) {
    options.shippingAddressCollection = {
      allowedCountries: cart.allowedCountries
    }
  }

  return options
}