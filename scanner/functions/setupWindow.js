function setupWindow() {
    const CompileCache = useSnapshot
      ? snapshotResult.customRequire('../src/compile-cache.js')
      : require('../src/compile-cache');
    CompileCache.setAtomHomeDirectory(process.env.ATOM_HOME);
    CompileCache.install(process.resourcesPath, require);

    const ModuleCache = useSnapshot
      ? snapshotResult.customRequire('../src/module-cache.js')
      : require('../src/module-cache');
    ModuleCache.register(getWindowLoadSettings());

    const startCrashReporter = useSnapshot
      ? snapshotResult.customRequire('../src/crash-reporter-start.js')
      : require('../src/crash-reporter-start');

    useSnapshot
      ? snapshotResult.customRequire(
          '../node_modules/document-register-element/build/document-register-element.node.js'
        )
      : require('document-register-element');

    const Grim = useSnapshot
      ? snapshotResult.customRequire('../node_modules/grim/lib/grim.js')
      : require('grim');
    const documentRegisterElement = document.registerElement;

    document.registerElement = (type, options) => {
      Grim.deprecate(
        'Use `customElements.define` instead of `document.registerElement` see https://javascript.info/custom-elements'
      );

      return documentRegisterElement(type, options);
    };

    const { userSettings, appVersion } = getWindowLoadSettings();
    const uploadToServer =
      userSettings &&
      userSettings.core &&
      userSettings.core.telemetryConsent === 'limited';
    const releaseChannel = getReleaseChannel(appVersion);

    startCrashReporter({
      uploadToServer,
      releaseChannel
    });

    const CSON = useSnapshot
      ? snapshotResult.customRequire('../node_modules/season/lib/cson.js')
      : require('season');
    CSON.setCacheDir(path.join(CompileCache.getCacheDirectory(), 'cson'));

    const initScriptPath = path.relative(
      entryPointDirPath,
      getWindowLoadSettings().windowInitializationScript
    );
    const initialize = useSnapshot
      ? snapshotResult.customRequire(initScriptPath)
      : require(initScriptPath);

    StartupTime.addMarker('window:initialize:start');

    return initialize({ blobStore: blobStore }).then(function() {
      StartupTime.addMarker('window:initialize:end');
      electron.ipcRenderer.send('window-command', 'window:loaded');
    });
  }