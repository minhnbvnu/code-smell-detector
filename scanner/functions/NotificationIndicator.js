function NotificationIndicator() {
  const { t } = useTranslation();
  const { allIds, seenIds } = useAnnouncements();

  const totalNotifCount = allIds.length - seenIds.length;
  const { isOpen } = useSelector(informationCenterStateSelector);
  const dispatch = useDispatch();

  return (
    <>
      <InformationDrawer
        isOpen={isOpen}
        onRequestClose={() => dispatch(closeInformationCenter())}
      />
      <Tooltip content={t("informationCenter.tooltip")} placement="bottom">
        <ItemContainer
          data-test-id="topbar-notification-button"
          isInteractive
          onClick={() => {
            dispatch(openInformationCenter());
          }}
        >
          <IconBell size={16} count={totalNotifCount} />
        </ItemContainer>
      </Tooltip>
    </>
  );
}