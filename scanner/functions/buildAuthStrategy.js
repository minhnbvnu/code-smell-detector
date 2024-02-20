function buildAuthStrategy(
  { clientID, clientSecret, callbackURL },
  isAuthorized
) {
  return new GoogleOAuth(
    { clientID, clientSecret, callbackURL },

    (accessToken, refreshToken, googleProfile, cb) => {
      const profile = googleProfileToMatrixProfile(googleProfile);

      if (!isAuthorized(profile)) {
        return cb(new Error(`E-mail ${profile.email} is not authorized`));
      }

      return cb(undefined, profile);
    }
  );
}