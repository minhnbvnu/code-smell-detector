function getSavedComponentFilters() {
  try {
    const raw = Object(storage["a" /* localStorageGetItem */])(constants["h" /* LOCAL_STORAGE_COMPONENT_FILTER_PREFERENCES_KEY */]);

    if (raw != null) {
      return JSON.parse(raw);
    }
  } catch (error) {}

  return getDefaultComponentFilters();
}