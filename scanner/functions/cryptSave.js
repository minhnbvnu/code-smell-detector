function cryptSave(value) {
  if (value) {
    var crypted = value;

    // passwords get
    if (this.type == 'login_primary' || this.type == 'login_sub') {
      crypted = strCryptSync(value);
      //app.logmessage('Trying to write login primary to account_auth [' + this.id + ']', 'error');
      //throw new Error('Bad Type');
    } else if (this.type !== 'token_invite') {
      crypted = AESCrypt(value);
    }

    return crypted;
  } else {
    return value;
  }
}