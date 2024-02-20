function notObject(object) {
  return ((typeof object != "object" && typeof object != "function") || object === null);
}