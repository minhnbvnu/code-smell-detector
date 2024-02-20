function useInsertionEffectMaybe(create) {
  if (!isBrowser) {
    return create();
  }

  useInsertionEffect(create);
}