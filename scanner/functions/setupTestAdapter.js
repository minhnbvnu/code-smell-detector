function setupTestAdapter(hooks) {
  // Some default responders that are part of the normal application boot cycle
  hooks.beforeEach(function () {
    respondWith('check-version', false, { isDefault: true });

    respondWith(
      'general:applicationBooted',
      {
        type: 'general:applicationBooted',
        applicationId: 'my-app',
        applicationName: 'My App',
        booted: true,
      },
      { isDefault: true }
    );

    respondWith(
      'app-picker-loaded',
      {
        type: 'apps-loaded',
        applicationId: null,
        applicationName: null,
        apps: [
          {
            applicationId: 'my-app',
            applicationName: 'My App',
          },
        ],
      },
      { isDefault: true }
    );

    respondWith('app-selected', false, { isDefault: true });

    respondWith(
      'deprecation:getCount',
      ({ applicationId, applicationName }) => ({
        type: 'deprecation:count',
        applicationId,
        applicationName,
        count: 0,
      }),
      { isDefault: true }
    );
  });

  // Ensure all expectations are met and reset the global states
  hooks.afterEach(function (assert) {
    for (let { file, line, actual, expected, reject } of resources) {
      if (!isNaN(expected) && actual !== expected) {
        assert.strictEqual(
          actual,
          expected,
          `Expceting resouce ${file}:${line} to be opened ${expected} time(s)`
        );
        reject(
          `Expceting resouce ${file}:${line} to be opened ${expected} time(s), was opened ${actual} time(s)`
        );
      }
    }

    for (let { type, isDefault, actual, expected, reject } of responders) {
      if (!isDefault && !isNaN(expected) && actual !== expected) {
        assert.strictEqual(
          actual,
          expected,
          `The correct amount of ${type} messages are sent`
        );
        reject(`Expecting ${expected} ${type} messages, got ${actual}`);
      }
    }

    adapter = null;
    resourcesEnabled = false;
    resources.length = 0;
    responders.length = 0;
  });
}