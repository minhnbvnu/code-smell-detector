function SecuredRoutes(app) {
  app.use(authenticate);
  app.use('/v1/user/', autherized);
  app.use('/v1/team/', team);
}