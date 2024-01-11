async function getSymbols() {
  const info = await generateInfo();
  return info.symbols.filter((symbol) => symbol.kind != 'member');
}