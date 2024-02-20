function Spritesmith(params) {
  // Process our parameters
  params = params || {};
  var engineName = params.engine || engineDefault;
  var Engine = engineName;

  // If the engine is a `require` path, attempt to load it
  if (typeof engineName === 'string') {
    // Attempt to resolve the engine to verify it is installed at all
    try {
      require.resolve(engineName);
    } catch (err) {
      /* eslint-disable no-console */
      console.error('Attempted to find spritesmith engine "' + engineName + '" but could not.');
      console.error('Please verify you have installed "' + engineName + '" and saved it to your `package.json`');
      console.error('');
      console.error('    npm install ' + engineName + ' --save-dev');
      console.error('');
      /* eslint-enable no-console */
      throw err;
    }

    // Attempt to load the engine
    try {
      // eslint-disable-next-line global-require
      Engine = require(engineName);
      if (typeof Engine !== 'function') {
        Engine = Engine.default;
      }
    } catch (err) {
      /* eslint-disable no-console */
      console.error('Attempted to load spritesmith engine "' + engineName + '" but could not.');
      console.error('Please verify you have installed its dependencies. Documentation should be available at ');
      console.error('');
      // TODO: Consider using pkg.homepage and pkg.repository
      console.error('    https://npm.im/' + encodeURIComponent(engineName));
      console.error('');
      /* eslint-enable no-console */
      throw err;
    }
  }

  // Verify we are on a matching `specVersion`
  if (!semver.satisfies(Engine.specVersion, SPEC_VERSION_RANGE)) {
    throw new Error('Expected `engine` to have `specVersion` within "' + SPEC_VERSION_RANGE + '" ' +
      'but it was "' + Engine.specVersion + '". Please verify you are on the latest version of your engine: ' +
      '`npm install my-engine@latest`');
  }

  // Create and save our engine for later
  this.engine = new Engine(params.engineOpts || {});
}