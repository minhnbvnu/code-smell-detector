function authenticate_user(args){

  var user = args.user,
  password = args.password,
  done     = args.done,
  email    = user.email;

  // In case of LDAP authentification connect the LDAP server
  if ( user.company.ldap_auth_enabled ) {

// email = 'euler@ldap.forumsys.com'; password = 'password'; // TODO remove
    Promise.resolve( user.company.get_ldap_server() )
      .then(function(ldap_server){

      ldap_server.authenticate(email, password, function (err, u) {
        ldap_server.close();

        if (err) {
          console.log("LDAP auth error: %s", err);
          return done(null, false);
        }
        prepare_user_for_session({
          user : user,
          done : done,
        });
      });

      ldap_server.close();
    })
    .catch(function(error){
      console.error('Failed while trying to deal with LDAP server with error: %s', error);

      done(null, false);
    });

  // Provided password is correct
  } else if (user.is_my_password(password)) {

    prepare_user_for_session({
      user : user,
      done : done,
    });

  // User exists but provided password does not match
  } else {
      console.error(
        'When login user entered existsing email ' +email+
        ' but incorrect password'
      );
      done(null, false);
  }
}