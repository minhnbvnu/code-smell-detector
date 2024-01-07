function CHtoWGSlng(y, x) {
  // Converts military to civil and to unit = 1000km
  // Axillary values (% Bern)
  const y_aux = (y - 600000) / 1000000;
  const x_aux = (x - 200000) / 1000000;

  // Process long
  let lng =
    2.6779094 +
    4.728982 * y_aux +
    0.791484 * y_aux * x_aux +
    0.1306 * y_aux * Math.pow(x_aux, 2) -
    0.0436 * Math.pow(y_aux, 3);

  // Unit 10000" to 1 " and converts seconds to degrees (dec)
  lng = (lng * 100) / 36;

  return lng;
}