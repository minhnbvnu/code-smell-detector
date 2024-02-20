function handleButtonPress() {
    if (roomName.length > 0) {
      // create new thread using firebase & firestore
      firestore()
        .collection('MESSAGE_THREADS')
        .add({
          name: roomName,
          latestMessage: {
            text: `${roomName} created. Welcome!`,
            createdAt: new Date().getTime()
          }
        })
        .then(docRef => {
          docRef.collection('MESSAGES').add({
            text: `${roomName} created. Welcome!`,
            createdAt: new Date().getTime(),
            system: true
          })
          navigation.navigate('ChatRoom')
        })
    }
  }