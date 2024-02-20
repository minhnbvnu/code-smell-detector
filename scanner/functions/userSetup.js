function userSetup() {
  var defaultUsername =  ('testing' === appEnv) ? 'testing' : 'admin';
  var userInstall = {
    type : 'input',
    name : 'username',
    message : 'API Username (HTTP Basic Auth Username, default "' + defaultUsername + '") :'
  }

  prompt(userInstall, function(answer) {
    if ('' === answer.username) {
      answer.username = defaultUsername;
    }

    credentials.username = answer.username.replace("\s_+", '');

    crypto.randomBytes(16, function(ex, buf) {
      var token = process.env.BIPIO_ADMIN_PASSWORD || buf.toString('hex');

      var userInstallPW = {
        type : 'input',
        name : 'password',
        message : 'API Password (HTTP Basic Auth Password, default "' + token + '") :'
      }

      prompt(userInstallPW, function(answer) {
        if ('' === answer.password) {
          answer.password = token;
        }
        credentials.password = answer.password;

        // install user.
        var userInstallEmail = {
          type : 'input',
          name : 'email',
          message : 'Administrator email (default "root@localhost") :'
        }

        prompt(userInstallEmail, function(answer) {
          if ('' === answer.email) {
            answer.email = 'root@localhost';
          }
          credentials.email = answer.email;

          if ('testing' === appEnv) {
            sparseConfig.testing_user = credentials;
          }

          // install user.
          auxServers();
        });
      });
    });
  });
}