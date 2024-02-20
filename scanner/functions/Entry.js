function Entry({ id, product, quantity, price_metadata, product_metadata }) {
  return {
    ...product,
    id,
    quantity,
    value: product.price * quantity,
    timestamp: new Date().toISOString(), // add a timestamp in ISO 8601 format
    price_data: {
      ...product.price_data,
      ...price_metadata
    },
    product_data: {
      ...product.product_data,
      ...product_metadata
    }
  }
}