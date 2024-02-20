function setUpProcessEnv() {
  GLOBAL.process = GLOBAL.process || {};
  GLOBAL.process.env = GLOBAL.process.env || {};
  if (!GLOBAL.process.env.NODE_ENV) {
    GLOBAL.process.env.NODE_ENV = __DEV__ ? 'development' : 'production';
  }
}