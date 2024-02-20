function validateComponentName(name, config) {
    const appIsNativeTag = config.isNativeTag || NO;
    if (isBuiltInTag(name) || appIsNativeTag(name)) {
      warn(
        "Do not use built-in or reserved HTML elements as component id: " + name
      );
    }
  }