function ProductList({ products }) {
  const { addItem } = useShoppingCart()

  return jsx`
    <h2 key="title">Products</h2>
    ${products.map(
      (product) => jsx`
      <article key=${product.sku}>
        <p>${product.name}</p>
        <button onClick=${() => addItem(product)}>Add to cart</button>
      </article>
    `
    )}
  `
}