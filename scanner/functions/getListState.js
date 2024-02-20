function getListState() {
  var list = [];
  list.push({
    title: i18n.t('logout'),
    actionType: AppConstants.LOGOUT_REQUESTED
  });

  return {
    items: list
  };
}