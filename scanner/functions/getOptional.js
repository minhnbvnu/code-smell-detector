function getOptional (key, orElse) {
  return deployerConfig[key] != null ? deployerConfig[key] : orElse
}