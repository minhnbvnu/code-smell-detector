function saveSingleton() {
  if(_singleton) {
    LocalKeyStore.setKey(LOCAL_STORE_KEY, _singleton.data);
    if (_singleton.data.id && _singleton.getToken()) {
      Keychain.setGenericPassword(_singleton.data.id.toString(), _singleton.getToken(), KEYCHAIN_SERVICE);
    }
  }
}