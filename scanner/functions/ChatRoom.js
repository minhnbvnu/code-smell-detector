function ChatRoom({ navigation }) {
  const [threads, setThreads] = useState([])
  const [loading, setLoading] = useState(true) // Set loading to true on component mount

  // On load, fetch our threads and subscribe to updates
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('MESSAGE_THREADS')
      .orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        // add threads into an array
        const threads = querySnapshot.docs.map(documentSnapshot => {
          return {
            _id: documentSnapshot.id, // required for FlatList
            // give defaults
            name: '',
            latestMessage: { text: '' },
            ...documentSnapshot.data()
          }
        })

        // Update state with the threads array
        setThreads(threads)
        // console.log(threads)
        if (loading) {
          setLoading(false)
        }
      })

    return () => unsubscribe() // Stop listening for updates whenever the component unmounts
  }, [])

  if (loading) {
    return <ActivityIndicator size='large' color='#555' />
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={threads}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Messages', { thread: item })}>
            <View style={styles.row}>
              <View style={styles.content}>
                <View style={styles.header}>
                  <Text style={styles.nameText}>{item.name}</Text>
                </View>
                <Text style={styles.contentText}>
                  {item.latestMessage.text.slice(0, 90)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
    </View>
  )
}