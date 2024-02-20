function ListEmpty({
  loading,
  message,
  ActivityIndicatorComponent,
  listMessageContainerStyle,
  listMessageTextStyle,
}) {
  return (
    <View style={listMessageContainerStyle}>
      {loading ? (
        <ActivityIndicatorComponent />
      ) : (
        <Text style={listMessageTextStyle}>{message}</Text>
      )}
    </View>
  );
}