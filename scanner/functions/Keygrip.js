function Keygrip(keys, algorithm, encoding) {
  if (!algorithm) algorithm = "sha1";
  if (!encoding) encoding = "base64";
  if (!(this instanceof Keygrip)) return new Keygrip(keys, algorithm, encoding)

  if (!keys || !(0 in keys)) {
    throw new Error("Keys must be provided.")
  }

  function sign(data, key) {
    return crypto
      .createHmac(algorithm, key)
      .update(data).digest(encoding)
      .replace(/\/|\+|=/g, function(x) {
        return ({ "/": "_", "+": "-", "=": "" })[x]
      })
  }

  this.sign = function(data){ return sign(data, keys[0]) }

  this.verify = function(data, digest) {
    return this.index(data, digest) > -1
  }

  this.index = function(data, digest) {
    for (var i = 0, l = keys.length; i < l; i++) {
      if (compare(digest, sign(data, keys[i]))) {
        return i
      }
    }

    return -1
  }
}