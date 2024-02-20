function calcReplicaCharAdvance(replicaChar, fontSize, fonts, minFontSize, unitsPerEm) {
  let style = charFontStyle(replicaChar)
  let charFontSize = calcFontSizeFromAttributes(fontSize, minFontSize, replicaChar.attributes)
  return calcCharAdvance(replicaChar.char, charFontSize, fonts[style], unitsPerEm)
}