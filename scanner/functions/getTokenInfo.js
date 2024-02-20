function getTokenInfo(mint, endpoint, tokenInfos) {
  if (!mint) {
    return { name: null, symbol: null };
  }

  let info = customTokenNamesByNetwork?.[endpoint]?.[mint.toBase58()];
  let match = tokenInfos?.find(
    (tokenInfo) => tokenInfo.address === mint.toBase58(),
  );

  if (match) {
    if (!info) {
      info = { ...match, logoUri: match.logoURI };
    }
    // The user has overridden a name locally.
    else {
      info = { ...match, ...info, logoUri: match.logoURI };
    }
  }
  return { ...info };
}