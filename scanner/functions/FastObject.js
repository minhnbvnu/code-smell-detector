function FastObject(o) {
  // A prototype object will have "fast properties" enabled once it is checked
  // against the inline property cache of a function, e.g. fastProto.property:
  // https://github.com/v8/v8/blob/6.0.122/test/mjsunit/fast-prototype.js#L48-L63
  if (fastProto !== null && typeof fastProto.property) {
    const result = fastProto;
    fastProto = FastObject.prototype = null;
    return result;
  }

  fastProto = FastObject.prototype = o == null ? Object.create(null) : o;
  return new FastObject();
}