function Shopify(options) {
  if (!(this instanceof Shopify)) return new Shopify(options);
  if (
    !options ||
    !options.shopName ||
    (!options.accessToken && (!options.apiKey || !options.password)) ||
    (options.accessToken && (options.apiKey || options.password)) ||
    (options.autoLimit && options.maxRetries)
  ) {
    throw new Error('Missing or invalid options');
  }

  EventEmitter.call(this);
  this.options = {
    parseJson: JSON.parse,
    stringifyJson: JSON.stringify,
    timeout: 60000,
    maxRetries: 0,
    ...options
  };

  //
  // API call limits, updated with each request.
  //
  this.callLimits = {
    remaining: undefined,
    current: undefined,
    max: undefined
  };
  this.callGraphqlLimits = {
    restoreRate: undefined,
    remaining: undefined,
    current: undefined,
    max: undefined,
    actualQueryCost: undefined,
    requestedQueryCost: undefined
  };

  this.baseUrl = {
    hostname: !options.shopName.endsWith('.myshopify.com')
      ? `${options.shopName}.myshopify.com`
      : options.shopName,
    protocol: 'https:'
  };

  this.baseHeaders = { 'User-Agent': `${pkg.name}/${pkg.version}` };

  if (options.accessToken) {
    this.baseHeaders['X-Shopify-Access-Token'] = options.accessToken;
  } else {
    this.baseHeaders.Authorization =
      'Basic ' +
      Buffer.from(`${options.apiKey}:${options.password}`).toString('base64');
  }

  if (options.autoLimit) {
    const conf = transform(
      options.autoLimit,
      (result, value, key) => {
        if (key === 'calls') key = 'limit';
        result[key] = value;
      },
      { bucketSize: 35 }
    );

    this.request = stopcock(this.request, conf);
  }
}