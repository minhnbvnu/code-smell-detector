function useTokenInfos() {
  const { tokenInfos } = useContext(TokenListContext);
  return tokenInfos;
}