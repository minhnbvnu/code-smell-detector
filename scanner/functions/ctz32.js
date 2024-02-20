function ctz32(value) {
  var c = Math.clz32(value & -value);
  return value ? 31 - c : c;
}