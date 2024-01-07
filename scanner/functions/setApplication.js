function setApplication(app) {
    currentApplication = app;
    GraphicsDeviceAccess.set(app?.graphicsDevice);
}