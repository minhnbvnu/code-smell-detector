function Cart() {
  const { formattedTotalPrice, clearCart } = useShoppingCart()

  return jsx`
    <section>
      <p>Total: ${formattedTotalPrice}</p>
      <button onClick=${clearCart}>Clear cart</button>
    </section>
  `
}