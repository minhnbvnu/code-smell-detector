function Signup({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onHandleSignup = () => {
    if (email !== '' && password !== '') {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => console.log('Signup success'))
        .catch(err => console.log(`Login err: ${err}`));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create new account</Text>
      <TextInput
        style={styles.input}
        placeholder='Enter email'
        autoCapitalize='none'
        keyboardType='email-address'
        textContentType='emailAddress'
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder='Enter password'
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry={true}
        textContentType='password'
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Button onPress={onHandleSignup} color='#f57c00' title='Signup' />
      <Button
        onPress={() => navigation.navigate('Login')}
        title='Go to Login'
      />
    </View>
  );
}