function doAuth() {
      windowHelper.redirect(_this.client.passwordless.buildVerifyUrl(params));
    }