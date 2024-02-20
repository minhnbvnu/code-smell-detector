function reloadEnvironment(platform, env) {
    return SandboxedModule.require('../src/browser/yo/environment', {
      singleOnly: true,
      requires: {
        'yeoman-environment': fakeEnvironment,
        'fix-path': fakeFixPath,
        './adapter': fakeAdapter
      },
      globals: {
        process: {
          env: _.extend({ PATH: '/some/node/path' }, env || {}),
          platform: platform
        }
      }
    });
  }