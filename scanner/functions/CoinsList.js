function CoinsList(props) {
  const { navigation } = props
  const { loading, data } = useQuery(FETCH_COIN_LIST)

  if (loading && !data) {
    return (
      <View style={styles.loadingIndicatorContainer}>
        <ActivityIndicator size='large' color='#fff' />
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.contentContainerStyle}
        data={data.coinsList.Data}
        keyExtractor={item => item.CoinInfo.Id.toString()}
        renderItem={({ item }) => {
          return (
            <ListItem
              coin={item}
              onPress={() => navigation.navigate('Detail', { coin: item })}
            />
          )
        }}
      />
    </View>
  )
}