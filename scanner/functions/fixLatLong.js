function fixLatLong(entry) {
  entry.longitude = ((Number(entry.longitude) + 180) % 360) - 180
  entry.latitude = ((Number(entry.latitude) + 90) % 180) - 90
}