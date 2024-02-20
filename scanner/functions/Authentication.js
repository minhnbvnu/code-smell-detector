function Authentication(auth0, options) {
  // If we have two arguments, the first one is a WebAuth instance, so we assign that
  // if not, it's an options object and then we should use that as options instead
  // this is here because we don't want to break people coming from v8
  if (arguments.length === 2) {
    this.auth0 = auth0;
  } else {
    options = auth0;
  }

  /* eslint-disable */
  assert.check(
    options,
    { type: 'object', message: 'options parameter is not valid' },
    {
      domain: { type: 'string', message: 'domain option is required' },
      clientID: { type: 'string', message: 'clientID option is required' },
      responseType: {
        optional: true,
        type: 'string',
        message: 'responseType is not valid'
      },
      responseMode: {
        optional: true,
        type: 'string',
        message: 'responseMode is not valid'
      },
      redirectUri: {
        optional: true,
        type: 'string',
        message: 'redirectUri is not valid'
      },
      scope: { optional: true, type: 'string', message: 'scope is not valid' },
      audience: {
        optional: true,
        type: 'string',
        message: 'audience is not valid'
      },
      _disableDeprecationWarnings: {
        optional: true,
        type: 'boolean',
        message: '_disableDeprecationWarnings option is not valid'
      },
      _sendTelemetry: {
        optional: true,
        type: 'boolean',
        message: '_sendTelemetry option is not valid'
      },
      _telemetryInfo: {
        optional: true,
        type: 'object',
        message: '_telemetryInfo option is not valid'
      }
    }
  );
  /* eslint-enable */

  this.baseOptions = options;
  this.baseOptions._sendTelemetry =
    this.baseOptions._sendTelemetry === false
      ? this.baseOptions._sendTelemetry
      : true;

  this.baseOptions.rootUrl =
    this.baseOptions.domain &&
      this.baseOptions.domain.toLowerCase().indexOf('http') === 0
      ? this.baseOptions.domain
      : 'https://' + this.baseOptions.domain;

  this.request = new RequestBuilder(this.baseOptions);

  this.passwordless = new PasswordlessAuthentication(
    this.request,
    this.baseOptions
  );
  this.dbConnection = new DBConnection(this.request, this.baseOptions);

  this.warn = new Warn({
    disableWarnings: !!options._disableDeprecationWarnings
  });
  this.ssodataStorage = new SSODataStorage(this.baseOptions);
}