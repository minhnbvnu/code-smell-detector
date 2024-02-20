function ShoppingCartIcon() {
  const navigation = useNavigation()
  const cartItems = useSelector(state => state)

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Cart')}
      style={styles.button}>
      <View style={styles.itemCountContainer}>
        <Text style={styles.itemCountText}>{cartItems.length}</Text>
      </View>
      <Ionicons name='ios-cart' size={32} color='#101010' />
    </TouchableOpacity>
  )
}