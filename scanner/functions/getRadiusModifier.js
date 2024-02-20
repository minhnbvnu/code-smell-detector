function getRadiusModifier() {
  // For putting radius handler on edge of circle
  // Formula for percentage radius is sqrt(width^2 + height^2) / sqrt(2);
  // Returns a decimal value from 0 to 1
  var radius_modifier =
    (width / 2 +
      Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) / Math.sqrt(2) / 2) /
    width;

  return radius_modifier;
}