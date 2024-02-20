function prepareSuite() {
  chai.use(chaiAsPromised);

  const appPath = '../../node_modules/.bin/electron';
  const state = {
    passed: true,
    tmpHomeDir: '',
    wsPath: function getWsPath(...extraPath) {
      return path.resolve(this.tmpHomeDir, 'xod', ...extraPath);
    },
    libPath: function getLibPath(...extraPath) {
      return path.resolve(resolveLibPath(this.wsPath()), ...extraPath);
    },
  };

  before(() => {
    const tmpDir = path.join(os.tmpdir(), 'xod-test-workspace-');

    // With a dirty hack we extract out objects that we’d interact later
    // in tests and tear-down. Impure, but can’t figure out a better solution
    // with Mocha
    return fse
      .mkdtemp(tmpDir)
      .then(home => {
        state.app = new Application({
          path: appPath,
          args: ['.'],
          // see https://github.com/electron-userland/spectron/issues/353#issuecomment-522846725
          // see https://github.com/RobCherry/docker-chromedriver/issues/15#issuecomment-430701229
          chromeDriverArgs: [
            'remote-debugging-port=9222',
            'whitelisted-ips=',
            'no-sandbox',
          ],
        });
        process.env.USERDATA_DIR = process.env.HOME = state.tmpHomeDir = home;

        return state.app.start();
      })
      .then(() => {
        state.page = Page.createPageObject(state.app.client);
        chaiAsPromised.transferPromiseness = state.app.transferPromiseness;
      });
  });

  afterEach(function checkForFailure() {
    if (this.currentTest.state === 'failed') {
      state.passed = false;
    }
  });

  after(() => {
    if (!state.passed || DEBUG) {
      state.app.client.getMainProcessLogs().then(logs => {
        logs.forEach(console.log); // eslint-disable-line no-console
      });
    }

    const shouldClose =
      state.app && state.app.isRunning() && (state.passed || !DEBUG);
    return shouldClose
      ? // TODO: simulating click on 'confirm' is probably cleaner
        state.app.electron.ipcRenderer
          .send('CONFIRM_CLOSE_WINDOW')
          .then(() => fse.remove(state.tmpHomeDir))
      : Promise.resolve();
  });

  return state;
}