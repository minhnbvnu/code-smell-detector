function BookScreen() {
  const dispatch = useDispatch()
  const addItemToCart = item => dispatch({ type: ADD_TO_CART, payload: item })

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => Separator()}
        renderItem={({ item }) => (
          <View style={styles.bookItemContainer}>
            <Image source={{ uri: item.imgUrl }} style={styles.thumbnail} />
            <View style={styles.bookItemMetaContainer}>
              <Text style={styles.textTitle} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.textAuthor}>by {item.author}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => addItemToCart(item)}
                  style={styles.button}>
                  <Text style={styles.buttonText}>Add +</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  )
}