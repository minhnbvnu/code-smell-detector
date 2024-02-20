function Management(options) {
  /* eslint-disable */
  assert.check(
    options,
    { type: 'object', message: 'options parameter is not valid' },
    {
      domain: { type: 'string', message: 'domain option is required' },
      token: { type: 'string', message: 'token option is required' },
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

  this.baseOptions.headers = {
    Authorization: 'Bearer ' + this.baseOptions.token
  };

  this.request = new RequestBuilder(this.baseOptions);
  this.baseOptions.rootUrl = urljoin(
    'https://' + this.baseOptions.domain,
    'api',
    'v2'
  );
}