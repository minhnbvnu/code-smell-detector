function confirmGeo(lineItem) {
  var hasGeo = false
  if (lineItem.lat && lineItem.long || lineItem.polygon) hasGeo = true
  if (lineItem.latitude && lineItem.longitude || lineItem.polygon) hasGeo = true
  if (lineItem.geolatitude && lineItem.geolongitude || lineItem.polygon) hasGeo = true
  return hasGeo
}