function calculateDimensions(group, value) {
  var bbox = group.getBBox();
  value.width = bbox.width;
  value.height = bbox.height;
}