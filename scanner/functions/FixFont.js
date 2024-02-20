function FixFont(f) {
  return "'" + f.replace(/(\'|\")/g,'').replace(/\s*,\s*/g, "', '") + "'";
}