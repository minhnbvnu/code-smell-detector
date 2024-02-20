function setIcon() {
  if (parseError) {
    setBadgeAndBackgroundColor(enums["a" /* BadgeText */].ERROR, enums["c" /* IconBackgroundColor */].ERROR);
    return;
  }
  if (forward[constants["s" /* DISABLED */]] !== enums["b" /* Enabled */].NO) {
    setBadgeAndBackgroundColor(forward[constants["z" /* JSON_CONFIG */]][constants["L" /* PROXY_STORAGE_KEY */]].length, enums["c" /* IconBackgroundColor */].ON);
  } else {
    setBadgeAndBackgroundColor(enums["a" /* BadgeText */].OFF, enums["c" /* IconBackgroundColor */].OFF);
    return;
  }
}