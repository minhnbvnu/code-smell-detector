function oauthAuthorizeParams(warn, params) {
  var notAllowed = objectHelper.getKeysNotIn(params, authorizeParams);

  if (notAllowed.length > 0) {
    warn.warning(
      'Following parameters are not allowed on the `/authorize` endpoint: [' +
        notAllowed.join(',') +
        ']'
    );
  }

  return params;
}