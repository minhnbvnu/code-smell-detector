async function rehydrateAsync() {
  if (!SHOULD_REHYDRATE || !AsyncStorage) {
    return defaultState;
  }
  try {
    const item = await AsyncStorage.getItem(STORAGE_KEY);
    const data = JSON.parse(item);
    return data;
  } catch (ignored) {
    return defaultState;
  }
}