function Detail(props) {
  const { route, navigation } = props
  const { item } = route.params
  const { name, home, species } = item
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Detail Screen</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>Name: {name}</Text>
        <Text style={styles.cardText}>Home Planet: {home}</Text>
        <Text style={styles.cardText}>Species: {species}</Text>
      </View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.navigate('Settings')}>
        <Text style={styles.buttonText}>Go to Settings</Text>
      </TouchableOpacity>
    </View>
  )
}