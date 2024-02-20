function ItemComponent({items}) {
  return (
    <View style={styles.itemsList}>
      {items.map((item, index) => {
        return (
          <View key={index}>
            <Text style={styles.itemtext}>{item.name}</Text>
          </View>
        );
      })}
    </View>
  );
}