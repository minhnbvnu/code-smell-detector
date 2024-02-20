function applyForwarding(key) {
  if (__DEV__) {
    Object.defineProperty(
      ReactNative,
      key,
      Object.getOwnPropertyDescriptor(ReactNativeInternal, key)
    );
    return;
  }
  ReactNative[key] = ReactNativeInternal[key];
}