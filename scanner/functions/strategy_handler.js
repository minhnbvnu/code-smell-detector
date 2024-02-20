function strategy_handler(email, password, done) {

  // Normalize email to be in lower case
  email = email.toLowerCase();

  model.User
    .find_by_email( email )
    .then(function(user){

      // Case when no user for provided email
      if ( ! user ) {
        console.error(
          'At login: failed to find user with provided email %s', email
        );

        // We need to abort the execution of current callback function
        // hence the return before calling "done" callback
        return done(null, false);
      }

      // Athenticate user by provided password
      user.getCompany()
        .then(function(company){

          // We need to have company for user fetchef dow the line so query it now
          user.company = company;

          authenticate_user({
            user     : user,
            password : password,
            done     : done,
          });
        });
    })

    // there was unknown error when trying to retrieve user object
    .catch(function(error){
      console.error(
        'At login: unknown error when trying to login in as %s. Error: %s',
        email, error
      );

      done(null, false);
    });
}