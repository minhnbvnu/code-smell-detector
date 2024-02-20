function TokenRegistryProvider(props) {
  const { endpoint } = useConnectionConfig();
  const [tokenInfos, setTokenInfos] = useState(null);
  useEffect(() => {
    if (endpoint !== MAINNET_BACKUP_URL && endpoint !== MAINNET_URL) return;
    const tokenListProvider = new TokenListProvider();
    tokenListProvider.resolve().then((tokenListContainer) => {
      const cluster = clusterForEndpoint(endpoint);

      const filteredTokenListContainer = tokenListContainer?.filterByClusterSlug(
        cluster?.clusterSlug,
      );
      const tokenInfos =
        tokenListContainer !== filteredTokenListContainer
          ? filteredTokenListContainer?.getList()
          : null; // Workaround for filter return all on unknown slug
      setTokenInfos(tokenInfos);
    });
  }, [endpoint]);

  return (
    <TokenListContext.Provider value={{ tokenInfos }}>
      {props.children}
    </TokenListContext.Provider>
  );
}