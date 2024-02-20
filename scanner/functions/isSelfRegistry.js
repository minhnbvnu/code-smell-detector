function isSelfRegistry(obj) {
  return isRegistry(obj) && typeof obj.registerInRequestor === "boolean";
}