function requirer(resolver) {
  return resolver == null ? requireDefault : requireFrom(resolver);
}