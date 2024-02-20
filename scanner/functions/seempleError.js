function seempleError(key, data) {
  const getError = errors[key];
  if (!getError) {
    throw Error(`Unknown error "${key}". Please report about this on Github.`);
  }

  return new Error(getError(data));
}