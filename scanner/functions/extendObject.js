function extendObject(kontraObj, properties) {
  let objectProto = kontraObj.prototype;

  if (!objectProto) return;

  Object.getOwnPropertyNames(properties).map(prop => {
    if (!objectProto[prop]) {
      objectProto[prop] = properties[prop];
    }
  });
}