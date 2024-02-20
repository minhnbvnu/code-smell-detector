function initSingleton(storedProps, token, username) {
  if (storedProps && token && username) {
    if (storedProps.id && storedProps.id.toString() === username.toString()) {
      // matches
      setUserProps(storedProps, token);
      return;
    }
  }
  setUserProps(null, null);
}