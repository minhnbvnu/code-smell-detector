function CartDetails() {
  const { cartCount } = useShoppingCart()

  if (cartCount < 1) return <AddMoreItems />
  return <CartDisplayWrapper />
}