function isNotEmpty(thing) {
  return isSimpleObject(thing) && Object.keys(thing).length > 0
}