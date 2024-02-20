async function cacheAsync(value) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(value));
}