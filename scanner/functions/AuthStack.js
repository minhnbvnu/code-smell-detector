function AuthStack() {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen name='Signup' component={SignupScreen} />
    </Stack.Navigator>
  );
}