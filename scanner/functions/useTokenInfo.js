function useTokenInfo(mint) {
  const { endpoint } = useConnectionConfig();
  useListener(nameUpdated, 'update');
  const tokenInfos = useTokenInfos();
  return getTokenInfo(mint, endpoint, tokenInfos);
}