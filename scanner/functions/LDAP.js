function LDAP(options) {
  this.options = options;

  this._ldapClient = ldap.createClient(options.server);
}