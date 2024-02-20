function onPasswordMismatch(event) {
    this.irc_connection.clientEvent('irc_error', {
        error: 'password_mismatch'
    });
}