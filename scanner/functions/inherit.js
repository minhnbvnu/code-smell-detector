function inherit(parent, extra) {
  return extend(new (extend(function() {}, { prototype: parent }))(), extra);
}