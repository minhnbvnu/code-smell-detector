function setupAppAuth(app) {
  app.use(passport.initialize());
  app.use(passport.session());
}