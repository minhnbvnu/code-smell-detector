function toHandlers(obj, preserveCaseIfNecessary) {
    const ret = {};
    if (!isObject(obj)) {
      warn(`v-on with no argument expects an object value.`);
      return ret;
    }
    for (const key in obj) {
      ret[preserveCaseIfNecessary && /[A-Z]/.test(key) ? `on:${key}` : toHandlerKey(key)] = obj[key];
    }
    return ret;
  }