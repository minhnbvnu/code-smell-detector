function isEmpty(object) {
  let property;
  for (property in object) {
    return false;
  }
  return !property;
}