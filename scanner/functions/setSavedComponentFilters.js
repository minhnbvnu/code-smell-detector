function setSavedComponentFilters(componentFilters) {
  Object(storage["c" /* localStorageSetItem */])(constants["h" /* LOCAL_STORAGE_COMPONENT_FILTER_PREFERENCES_KEY */], JSON.stringify(componentFilters));
}