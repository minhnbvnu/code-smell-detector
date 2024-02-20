function initOAuth(opts) {
  var o = (opts||{});
  var errors = [];

  appName = (o.appName||errors.push('missing appName'));
  popupMask = (o.popupMask||$('#api-common-mask'));
  popupDialog = (o.popupDialog||$('.api-popup-dialog'));
  clientId = (o.clientId||errors.push('missing client id'));
  clientSecret = (o.clientSecret||null);
  realm = (o.realm||errors.push('missing realm'));
  scopeSeparator = (o.scopeSeparator||' ');
  additionalQueryStringParams = (o.additionalQueryStringParams||{});

  if(errors.length > 0){
    log('auth unable initialize oauth: ' + errors);
    return;
  }

  $('pre code').each(function(i, e) {hljs.highlightBlock(e)});
  $('.api-ic').unbind();
  $('.api-ic').click(function(s) {
    if($(s.target).hasClass('ic-off'))
      handleLogin();
    else {
      handleLogout();
    }
    false;
  });
}