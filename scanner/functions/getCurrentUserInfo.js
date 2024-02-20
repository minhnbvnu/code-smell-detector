async function getCurrentUserInfo() {
    try {
      const userInfo = await GoogleSignin.signInSilently()
      setUserInfo(userInfo)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // when user hasn't signed in yet
        Alert.alert('Please Sign in')
        setIsLoggedIn(false)
      } else {
        Alert.alert('Something else went wrong... ', error.toString())
        setIsLoggedIn(false)
      }
    }
  }