function initializeStripe(publicKey) {
  try {
    // eslint-disable-next-line no-undef
    const stripe = Stripe(publicKey)
    stripe.registerAppInfo({
      name: 'use-shopping-cart',
      version: process.env.__buildVersion__,
      url: 'https://useshoppingcart.com',
      // eslint-disable-next-line camelcase
      partner_id: 'pp_partner_H8MLmI3e9Oc3IK'
    })
    return stripe
  } catch (error) {
    console.error('Unable to initialize Stripe.')
    throw error
  }
}