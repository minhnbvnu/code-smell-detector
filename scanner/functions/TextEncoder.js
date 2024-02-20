function TextEncoder(opt_encoding, options) {
    if (!(this instanceof TextEncoder)) {
      return new TextEncoder(opt_encoding, options);
    }
    opt_encoding = opt_encoding ? String(opt_encoding) : DEFAULT_ENCODING;
    options = Object(options);
    /** @private */
    this._encoding = getEncoding(opt_encoding);

    var allowLegacyEncoding = options.NONSTANDARD_allowLegacyEncoding;
    var isLegacyEncoding = (this._encoding.name !== 'utf-8' &&
                            this._encoding.name !== 'utf-16le' &&
                            this._encoding.name !== 'utf-16be');
    if (this._encoding === null || (isLegacyEncoding && !allowLegacyEncoding))
      throw new TypeError('Unknown encoding: ' + opt_encoding);

    if (!this._encoding.getEncoder)
      throw new Error('Encoder not present. Did you forget to include encoding-indexes.js?');

    /** @private @type {boolean} */
    this._streaming = false;
    /** @private */
    this._encoder = null;
    /** @private @type {{fatal: boolean}=} */
    this._options = { fatal: Boolean(options.fatal) };

    if (Object.defineProperty) {
      Object.defineProperty(
          this, 'encoding',
          { get: function() { return this._encoding.name; } });
    } else {
      this.encoding = this._encoding.name;
    }

    return this;
  }