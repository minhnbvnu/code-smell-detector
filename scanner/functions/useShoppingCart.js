function useShoppingCart(
  selector = (state) => ({ ...state }),
  equalityFn
) {
  const dispatch = useDispatch()
  const cartState = useSelector(selector, equalityFn)

  const shoppingCart = React.useMemo(() => {
    const cartActions = bindActionCreators(actions, dispatch)
    return { ...cartState, ...cartActions }
  }, [cartState, dispatch])

  React.useDebugValue(shoppingCart)
  return shoppingCart
}