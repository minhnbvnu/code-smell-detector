function determineType(lineItem) {
  var type = ""
  if (lineItem.lat && lineItem.long) type = "Point"
  if (lineItem.polygon) type = "Polygon"
  if (lineItem.multipolygon) type = "MultiPolygon"
  if (lineItem.linestring) type = "LineString"
  return type
}