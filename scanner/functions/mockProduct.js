function mockProduct(overrides) {
  return {
    id: `product-id-${counter++}`,
    name: 'mock-product-name',
    price: Math.floor(Math.random() * 1000 + 1),
    image: 'https://mock.product/url',
    alt: 'mock-product-alt-text',
    currency: 'usd',
    ...overrides
  }
}