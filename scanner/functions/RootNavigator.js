function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode="none"
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="DetailScreen"
          component={DetailScreen}
          options={() => options}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}