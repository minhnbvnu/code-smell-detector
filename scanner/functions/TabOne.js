function TabOne() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Tab One</Text>
      <FocusAwareStatusBar style="dark" animated={true} />
    </View>
  );
}