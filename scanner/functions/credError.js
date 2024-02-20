function credError(msg, err) {
      return new AWS.util.error(err || new Error(), {
        code: 'CredentialsError', message: msg
      });
    }