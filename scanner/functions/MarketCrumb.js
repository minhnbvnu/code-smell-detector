function MarketCrumb() {
  const { t } = useTranslation();
  const history = useHistory();
  const { currencyId } = useParams();
  const { selectedCoinData } = useSingleCoinMarketData(currencyId);

  const goBackToMarket = useCallback(
    item => {
      setTrackingSource("Page Market Coin - Breadcrumb");
      history.push({ pathname: `/market` });
    },
    [history],
  );

  return selectedCoinData ? (
    <>
      <TextLink>
        <Button onClick={goBackToMarket}>{t("market.title")}</Button>
      </TextLink>
      <Separator />
      <Text>{selectedCoinData.name}</Text>
    </>
  ) : null;
}