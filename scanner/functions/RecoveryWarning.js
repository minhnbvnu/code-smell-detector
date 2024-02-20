function RecoveryWarning() {
  const { t } = useTranslation();

  const onClickLink = useCallback(() => openURL(urls.faq), []);

  return (
    <ScrollArea>
      <PinHelpContainer>
        <Text mt={4} textAlign="center" color="warning">
          <TriangleWarning size={56} />
        </Text>

        <Text
          color="palette.text.shade100"
          ff="Inter|SemiBold"
          fontSize="22px"
          lineHeight="26.63px"
        >
          {t("onboarding.screens.tutorial.screens.existingRecoveryPhrase.warning.title")}
        </Text>
        <Text
          mt="8px"
          color="palette.text.shade100"
          ff="Inter|Regular"
          fontSize="14px"
          lineHeight="19.5px"
        >
          {t("onboarding.screens.tutorial.screens.existingRecoveryPhrase.warning.desc")}
        </Text>
        <FakeLink onClick={onClickLink}>
          <Text
            mt="8px"
            color="palette.primary.main"
            ff="Inter|Regular"
            fontSize="14px"
            lineHeight="19.5px"
          >
            {t("onboarding.screens.tutorial.screens.existingRecoveryPhrase.warning.supportLink")}
          </Text>
        </FakeLink>
      </PinHelpContainer>
    </ScrollArea>
  );
}