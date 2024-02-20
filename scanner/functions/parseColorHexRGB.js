function parseColorHexRGB(raw) {
  const hex_color = standardize_color(raw)
  const result = hexRGBRegex.exec(hex_color)

  if (result === null) {
    return null
  }

  let digits = result[1]

  if (digits.length === 3) {
    const r = digits.charAt(0)
    const g = digits.charAt(1)
    const b = digits.charAt(2)

    digits = r.concat(r, g, g, b, b)
  }

  const rawInt = parseInt(digits, 16)

  if (isNaN(rawInt)) {
    return null
  }

  // Note the use of >>> rather than >> as we want JS to manipulate these as unsigned numbers
  return SwatchRGB.create(
    normalize((rawInt & 0xff0000) >>> 16, 0, 255),
    normalize((rawInt & 0x00ff00) >>> 8, 0, 255),
    normalize(rawInt & 0x0000ff, 0, 255),
    1
  )
}