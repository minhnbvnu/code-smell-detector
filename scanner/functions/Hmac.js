function Hmac (alg, key, saltLen) {
  var hash = getDigest(alg)
  var blocksize = (alg === 'sha512' || alg === 'sha384') ? 128 : 64

  if (key.length > blocksize) {
    key = hash(key)
  } else if (key.length < blocksize) {
    key = Buffer.concat([key, ZEROS], blocksize)
  }

  var ipad = Buffer.allocUnsafe(blocksize + sizes[alg])
  var opad = Buffer.allocUnsafe(blocksize + sizes[alg])
  for (var i = 0; i < blocksize; i++) {
    ipad[i] = key[i] ^ 0x36
    opad[i] = key[i] ^ 0x5C
  }

  var ipad1 = Buffer.allocUnsafe(blocksize + saltLen + 4)
  ipad.copy(ipad1, 0, 0, blocksize)
  this.ipad1 = ipad1
  this.ipad2 = ipad
  this.opad = opad
  this.alg = alg
  this.blocksize = blocksize
  this.hash = hash
  this.size = sizes[alg]
}