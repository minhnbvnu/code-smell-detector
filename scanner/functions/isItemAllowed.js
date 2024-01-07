function isItemAllowed(item, location) {
  if (typeof item.getAllowedLocations !== 'function') return true;
  return item.getAllowedLocations().includes(location);
}