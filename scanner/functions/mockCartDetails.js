function mockCartDetails(overrides1, overrides2) {
  return {
    [`id_abc${counter}`]: {
      id: `id_abc${counter++}`,
      name: 'Bananas',
      image: 'https://blah.com/banana.avif',
      price: 400,
      currency: 'USD',
      value: 800,
      quantity: 2,
      ...overrides1
    },
    [`id_efg${counter}`]: {
      id: `id_efg${counter++}`,
      name: 'Oranges',
      image: 'https://blah.com/orange.avif',
      currency: 'USD',
      price: 250,
      value: 1000,
      quantity: 4,
      ...overrides2
    }
  }
}