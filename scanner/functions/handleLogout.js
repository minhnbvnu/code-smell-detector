function handleLogout() {
  for(key in window.swaggerUi.api.clientAuthorizations.authz){
    window.swaggerUi.api.clientAuthorizations.remove(key)
  }
  window.enabledScopes = null;
  $('.api-ic.ic-on').addClass('ic-off');
  $('.api-ic.ic-on').removeClass('ic-on');

  // set the info box
  $('.api-ic.ic-warning').addClass('ic-error');
  $('.api-ic.ic-warning').removeClass('ic-warning');
}