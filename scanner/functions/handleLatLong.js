function handleLatLong(lineItem) {
  if (lineItem.latitude && lineItem.longitude || lineItem.polygon) {
    lineItem.lat = lineItem.latitude
    lineItem.long = lineItem.longitude
    delete lineItem.latitude
    delete lineItem.longitude
    return lineItem
  }
  if (lineItem.geolatitude && lineItem.geolongitude || lineItem.polygon) {
    lineItem.lat = lineItem.geolatitude
    lineItem.long = lineItem.geolongitude
    delete lineItem.geolatitude
    delete lineItem.geolongitude
    return lineItem
  }
}