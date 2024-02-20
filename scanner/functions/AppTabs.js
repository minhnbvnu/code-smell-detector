function AppTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Upload" component={UploadScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}