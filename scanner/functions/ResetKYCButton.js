function ResetKYCButton() {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onResetKYC = useCallback(() => {
    dispatch(openModal("MODAL_SWAP_RESET_KYC"));
  }, [dispatch]);

  return (
    <Button small primary onClick={onResetKYC} event="KYCReset">
      {t("common.reset")}
    </Button>
  );
}