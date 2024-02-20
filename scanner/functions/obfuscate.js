function obfuscate(raw, dialect) {
  let replacers = dialects[dialect]
  if (!replacers) {
    replacers = dialects.default
  }

  let obfuscated = raw
  for (let i = 0, l = replacers.length; i < l; ++i) {
    obfuscated = replacers[i](obfuscated)
  }

  return obfuscated
}