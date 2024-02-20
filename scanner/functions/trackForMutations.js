function trackForMutations(isImmutable, ignore, obj) {
  const trackedProperties = trackProperties(isImmutable, ignore, obj);
  return {
    detectMutations() {
      return detectMutations(isImmutable, ignore, trackedProperties, obj);
    }
  };
}