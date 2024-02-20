function Settings(props) {
  const { navigation } = props
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => navigation.popToTop()}>
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  )
}