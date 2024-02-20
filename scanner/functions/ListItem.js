function ListItem(props) {
  const { coin, onPress } = props
  const { CoinInfo, DISPLAY } = coin
  const { FullName, Name } = CoinInfo

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress && onPress(coin)}>
      <View style={styles.row}>
        <Text style={styles.text} numberOfLines={1}>
          {Name}
        </Text>
        <View style={styles.right}>
          <Text style={styles.text} numberOfLines={1}>
            {DISPLAY.USD.PRICE}
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        <Text style={[styles.text, styles.name]} numberOfLines={1}>
          {FullName}
        </Text>
      </View>
    </TouchableOpacity>
  )
}