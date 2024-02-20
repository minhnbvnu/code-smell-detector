function MainTabNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#101010',
        style: {
          backgroundColor: '#ffd700'
        }
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName
          if (route.name == 'Home') {
            iconName = 'ios-home'
          } else if (route.name == 'Profile') {
            iconName = 'ios-person'
          }
          return <Ionicons name={iconName} color={color} size={size} />
        }
      })}>
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Profile' component={Profile} />
    </Tab.Navigator>
  )
}