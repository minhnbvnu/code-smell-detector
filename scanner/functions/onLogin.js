function onLogin({ provider, firebase }) {
  return async () => {
    try {
      const result = await firebase
        .auth()
        .signInWithPopup(provider)
      const { user } = result;
      const userData = {
        img: user.photoURL,
        username: user.displayName
      }
      
      UserDb.insert(userData)
      redirectToLobby()
    } catch (error) {
      alert(JSON.stringify(error))
      console.error('error', error)
    }

  }
}