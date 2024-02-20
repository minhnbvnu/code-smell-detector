function parseMintData(data) {
  let { decimals } = MINT_LAYOUT.decode(data);
  return { decimals };
}