function SectionAccounts() {
  const { t } = useTranslation();

  return (
    <Body>
      <TrackPage category="Settings" name="Accounts" />
      <SectionExport />
      <Row
        title={t("settings.accounts.hideEmptyTokens.title")}
        desc={t("settings.accounts.hideEmptyTokens.desc")}
      >
        <HideEmptyTokenAccountsToggle />
      </Row>
      <BlacklistedTokens />
      <HiddenNftCollections />
      <Currencies />
    </Body>
  );
}