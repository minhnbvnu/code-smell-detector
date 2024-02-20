function AccountSubHeader() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const { t } = useTranslation();

  function openDrawer() {
    setIsDrawerOpen(true);
  }

  function closeDrawer() {
    setIsDrawerOpen(false);
  }
  return (
    <Card px={2} py={1} mb={3}>
      <CardContent>
        <CardHeaderContainer>
          <InfoCircle size={12} />
          <CardHeader>{t("elrond.account.subHeader.cardTitle")}</CardHeader>
        </CardHeaderContainer>
        <CustomButton outline onClick={openDrawer}>
          <Box horizontal flow={1} alignItems="center">
            <Box fontSize={3}>
              <Trans i18nKey="elrond.account.subHeader.moreInfo" />
            </Box>
            <ChevronRight size={12} />
          </Box>
        </CustomButton>
      </CardContent>
      <AccountSubHeaderDrawer isOpen={isDrawerOpen} closeDrawer={closeDrawer} />
    </Card>
  );
}