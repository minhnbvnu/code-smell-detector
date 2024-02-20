function hasAlreadyLoadedHookNames(element) {
  const record = hookNamesCache_map.get(element);
  return record != null && record.status === Resolved;
}