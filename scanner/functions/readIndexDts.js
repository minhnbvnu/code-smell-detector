async function readIndexDts(name) {
  const file = await read(new URL(name + '/index.d.ts', packagesUrl), 'utf8')
  const value = String(file.value)
  /** @type {Array<string>} */
  const symbols = []
  // Note: this is super naïve of course.
  const matches = value.matchAll(/export type (\w+) = (?!import\('[@a-z])/g)

  for (const match of matches) {
    const symbol = match[1]

    if (isIdentifierName(symbol)) {
      const head = symbol.charAt(0)
      assert(head === head.toUpperCase())
      symbols.push(symbol)
    } else {
      const message = file.message('Expected a valid type `' + symbol + '`')
      message.fatal = true
    }
  }

  return [symbols, file]
}