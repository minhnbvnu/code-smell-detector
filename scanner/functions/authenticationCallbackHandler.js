function authenticationCallbackHandler({
  successRedirect,
  failureRedirect
}) {
  return function(req, resp, next) {
    const redirectToFailure = err => {
      const errorMessage = err || "";

      resp
        .status(401)
        .redirect(
          `${failureRedirect}?error=${encodeURIComponent(errorMessage)}`
        );
    };

    passport.authenticate(authStrategy, function(err, profile) {
      if (err) {
        return redirectToFailure(err);
      }
      if (!profile) {
        return redirectToFailure();
      }

      req.login(profile, err => {
        if (err) {
          return redirectToFailure(err);
        }

        resp.redirect(successRedirect);
      });
    })(req, resp, next);
  };
}