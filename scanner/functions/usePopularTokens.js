function usePopularTokens() {
  const tokenInfos = useTokenInfos();
  const { endpoint } = useConnectionConfig();
  return (!POPULAR_TOKENS[endpoint]
    ? []
    : POPULAR_TOKENS[endpoint]
  ).map((tok) =>
    getTokenInfo(new PublicKey(tok.mintAddress), endpoint, tokenInfos),
  );
}