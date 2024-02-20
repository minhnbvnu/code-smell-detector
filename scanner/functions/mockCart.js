function mockCart(overrides, cartDetailsOverrides1, cartDetailsOverrides2) {
  return {
    ...initialState,
    cartDetails: mockCartDetails(cartDetailsOverrides1, cartDetailsOverrides2),
    cartCount: 6,
    totalPrice: 1800,
    formattedTotalPrice: '$18.00',
    ...overrides
  }
}