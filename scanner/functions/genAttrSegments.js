function genAttrSegments (
  attrs
) {
  return attrs.map(function (ref) {
    var name = ref.name;
    var value = ref.value;

    return genAttrSegment(name, value);
  })
}