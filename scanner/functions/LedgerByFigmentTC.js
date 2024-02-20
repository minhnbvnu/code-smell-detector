function LedgerByFigmentTC() {
  const { t } = useTranslation();
  const openLedgerByFigmentTC = () => openURL(urls.solana.ledgerByFigmentTC);

  return (
    <LinkWithExternalIcon
      label={t("solana.delegation.ledgerByFigmentTC")}
      onClick={openLedgerByFigmentTC}
    />
  );
}