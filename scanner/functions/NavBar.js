function NavBar() {
  const { handleCartClick, cartCount } = useShoppingCart()
  return (
    <nav className="py-5 bg-white px-12 flex text-black justify-between">
      <Link
        href="/"
        className="bg-white text-3xl font-bold underline underline-offset-4 decoration-wavy decoration-2 decoration-emerald-500"
      >
        fresh
      </Link>
      <button className="relative" onClick={() => handleCartClick()}>
        <Image
          src="./cart.svg"
          width={40}
          height={40}
          alt="shopping cart icon"
        />
        <div className="rounded-full flex justify-center items-center bg-emerald-500 text-xs text-white absolute w-6 h-5 bottom-6 -right-1">
          {cartCount}
        </div>
      </button>
      <ShoppingCart />
    </nav>
  )
}