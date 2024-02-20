function get_and_validate_ldap_auth_configuration(args) {
  var req = args.req;

  // Get parameters
  //
  var url                      = validator.trim(req.body['url']),
  binddn                       = validator.trim(req.body['binddn']),
  bindcredentials              = validator.trim(req.body['bindcredentials']),
  searchbase                   = validator.trim(req.body['searchbase']),
  ldap_auth_enabled            = validator.toBoolean(req.body['ldap_auth_enabled']),
  allow_unauthorized_cert      = validator.toBoolean(req.body['allow_unauthorized_cert']),

  // Fetch the password of current user that is valid in LDAP system
  password_to_check = validator.trim(req.body['password_to_check']);

  // Validate provided parameters

  if (!validator.matches(url, /^ldaps?:\/\/[a-z0-9\.\-]+:\d+$/i)){
    req.session.flash_error(
      "URL to LDAP server must be of following format: 'ldap://HOSTNAME:PORT'"
    );
  }

  if ( req.session.flash_has_errors() ) {
    var error = new Error("Validation failed");
    error.show_to_user = true;
    throw error;
  }

  // Return the configuration object
  return {
    ldap_config : {
      url                     : url,
      binddn                  : binddn,
      bindcredentials         : bindcredentials,
      searchbase              : searchbase,
      allow_unauthorized_cert : allow_unauthorized_cert,
    },
    ldap_auth_enabled : ldap_auth_enabled,
    password_to_check : password_to_check,
  };
}