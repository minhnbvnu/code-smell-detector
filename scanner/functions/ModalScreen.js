function ModalScreen({ navigation }) {
  const [value, setValue] = useState('')

  const dispatch = useDispatch()

  const onSaveNote = value => {
    dispatch(addItem(value))
    navigation.navigate('List')
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.closeButtonContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => navigation.goBack()}>
            <Ionicons name='ios-close' color='#101010' size={40} />
          </TouchableOpacity>
        </View>
        <View style={styles.modalContainer}>
          <Text style={{ color: '#444', fontSize: 20 }}>
            What do you want to do?
          </Text>
          <TextInput
            style={{
              height: 50,
              width: 200,
              padding: 5,
              borderColor: 'gray',
              borderBottomWidth: 1
            }}
            numberOfLines={1}
            onChangeText={value => setValue(value)}
            value={value}
            clearButtonMode='while-editing'
          />
          <TouchableOpacity
            style={{
              marginTop: 10,
              backgroundColor: 'blue',
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5
            }}
            onPress={() => onSaveNote(value)}>
            <Ionicons
              name='ios-arrow-dropright-circle'
              size={40}
              color='#fff'
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}