function WebAuth(options) {
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
      popupOrigin: {
        optional: true,
        type: 'string',
        message: 'popupOrigin is not valid'
      },
      leeway: {
        optional: true,
        type: 'number',
        message: 'leeway is not valid'
      },
      plugins: {
        optional: true,
        type: 'array',
        message: 'plugins is not valid'
      },
      maxAge: {
        optional: true,
        type: 'number',
        message: 'maxAge is not valid'
      },
      stateExpiration: {
        optional: true,
        type: 'number',
        message: 'stateExpiration is not valid'
      },
      legacySameSiteCookie: {
        optional: true,
        type: 'boolean',
        message: 'legacySameSiteCookie option is not valid'
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
      },
      _timesToRetryFailedRequests: {
        optional: true,
        type: 'number',
        message: '_timesToRetryFailedRequests option is not valid'
      }
    }
  );

  if (options.overrides) {
    assert.check(
      options.overrides,
      { type: 'object', message: 'overrides option is not valid' },
      {
        __tenant: {
          optional: true,
          type: 'string',
          message: '__tenant option is required'
        },
        __token_issuer: {
          optional: true,
          type: 'string',
          message: '__token_issuer option is required'
        },
        __jwks_uri: {
          optional: true,
          type: 'string',
          message: '__jwks_uri is required'
        }
      }
    );
  }
  /* eslint-enable */

  this.baseOptions = options;
  this.baseOptions.plugins = new PluginHandler(
    this,
    this.baseOptions.plugins || []
  );

  this.baseOptions._sendTelemetry =
    this.baseOptions._sendTelemetry === false
      ? this.baseOptions._sendTelemetry
      : true;

  this.baseOptions._timesToRetryFailedRequests =
    options._timesToRetryFailedRequests
      ? parseInt(options._timesToRetryFailedRequests)
      : 0;

  this.baseOptions.tenant =
    (this.baseOptions.overrides && this.baseOptions.overrides.__tenant) ||
    this.baseOptions.domain.split('.')[0];

  this.baseOptions.token_issuer =
    (this.baseOptions.overrides && this.baseOptions.overrides.__token_issuer) ||
    'https://' + this.baseOptions.domain + '/';

  this.baseOptions.jwksURI =
    this.baseOptions.overrides && this.baseOptions.overrides.__jwks_uri;

  if (options.legacySameSiteCookie !== false) {
    this.baseOptions.legacySameSiteCookie = true;
  }

  this.transactionManager = new TransactionManager(this.baseOptions);

  this.client = new Authentication(this.baseOptions);

  /** @member {Redirect} */
  this.redirect = new Redirect(this, this.baseOptions);

  /** @member {Popup} */
  this.popup = new Popup(this, this.baseOptions);

  this.crossOriginAuthentication = new CrossOriginAuthentication(
    this,
    this.baseOptions
  );

  this.webMessageHandler = new WebMessageHandler(this);
  this._universalLogin = new HostedPages(this, this.baseOptions);
  this.ssodataStorage = new SSODataStorage(this.baseOptions);
}