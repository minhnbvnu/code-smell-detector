function convertMSColorToString(colorMS) {
  return JSON.stringify({ r: colorMS.red(), g: colorMS.green(), b: colorMS.blue(), a: colorMS.alpha() })
}