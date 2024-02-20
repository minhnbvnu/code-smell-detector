function RequestSigner(options) {
  assert.object(options, 'options');

  var alg = [];
  if (options.algorithm !== undefined) {
    assert.string(options.algorithm, 'options.algorithm');
    alg = validateAlgorithm(options.algorithm);
  }
  this.rs_alg = alg;

  /*
   * RequestSigners come in two varieties: ones with an rs_signFunc, and ones
   * with an rs_signer.
   *
   * rs_signFunc-based RequestSigners have to build up their entire signing
   * string within the rs_lines array and give it to rs_signFunc as a single
   * concat'd blob. rs_signer-based RequestSigners can add a line at a time to
   * their signing state by using rs_signer.update(), thus only needing to
   * buffer the hash function state and one line at a time.
   */
  if (options.sign !== undefined) {
    assert.func(options.sign, 'options.sign');
    this.rs_signFunc = options.sign;

  } else if (alg[0] === 'hmac' && options.key !== undefined) {
    assert.string(options.keyId, 'options.keyId');
    this.rs_keyId = options.keyId;

    if (typeof (options.key) !== 'string' && !Buffer.isBuffer(options.key))
      throw (new TypeError('options.key for HMAC must be a string or Buffer'));

    /*
     * Make an rs_signer for HMACs, not a rs_signFunc -- HMACs digest their
     * data in chunks rather than requiring it all to be given in one go
     * at the end, so they are more similar to signers than signFuncs.
     */
    this.rs_signer = crypto.createHmac(alg[1].toUpperCase(), options.key);
    this.rs_signer.sign = function () {
      var digest = this.digest('base64');
      return ({
        hashAlgorithm: alg[1],
        toString: function () { return (digest); }
      });
    };

  } else if (options.key !== undefined) {
    var key = options.key;
    if (typeof (key) === 'string' || Buffer.isBuffer(key))
      key = sshpk.parsePrivateKey(key);

    assert.ok(sshpk.PrivateKey.isPrivateKey(key, [1, 2]),
      'options.key must be a sshpk.PrivateKey');
    this.rs_key = key;

    assert.string(options.keyId, 'options.keyId');
    this.rs_keyId = options.keyId;

    if (!PK_ALGOS[key.type]) {
      throw (new InvalidAlgorithmError(key.type.toUpperCase() + ' type ' +
        'keys are not supported'));
    }

    if (alg[0] !== undefined && key.type !== alg[0]) {
      throw (new InvalidAlgorithmError('options.key must be a ' +
        alg[0].toUpperCase() + ' key, was given a ' +
        key.type.toUpperCase() + ' key instead'));
    }

    this.rs_signer = key.createSign(alg[1]);

  } else {
    throw (new TypeError('options.sign (func) or options.key is required'));
  }

  this.rs_headers = [];
  this.rs_lines = [];
}