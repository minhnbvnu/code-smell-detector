function useInsertionEffectMaybe$1(create) {
  if (!isBrowser$1$1) {
    return create();
  }

  useInsertionEffect$2(create);
}