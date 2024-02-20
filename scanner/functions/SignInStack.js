function SignInStack() {
  async function logOut() {
    try {
      await auth().signOut()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='ChatRoom'
          component={ChatRoom}
          options={({ navigation }) => ({
            title: 'Chat Room',
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => navigation.navigate(CreateChatRoom)}>
                <Icon name='ios-add' size={30} color='#444' />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity style={{ marginRight: 10 }} onPress={logOut}>
                <Icon name='ios-log-out' size={30} color='#444' />
              </TouchableOpacity>
            )
          })}
        />
        <Stack.Screen
          name='CreateChatRoom'
          component={CreateChatRoom}
          options={{
            title: 'Create a room'
          }}
        />
        <Stack.Screen
          name='Messages'
          component={Messages}
          options={({ route }) => ({
            title: route.params.thread.name
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}