function getOpenInEditorURL() {
  try {
    const raw = Object(storage["a" /* localStorageGetItem */])(constants["k" /* LOCAL_STORAGE_OPEN_IN_EDITOR_URL */]);

    if (raw != null) {
      return JSON.parse(raw);
    }
  } catch (error) {}

  return getDefaultOpenInEditorURL();
}