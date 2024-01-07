function buildCipherConstructor(cf, name, num, gen, key) {
    if (!(0, _primitives.isName)(name)) {
      throw new _util.FormatError("Invalid crypt filter name.");
    }

    var cryptFilter = cf.get(name.name);
    var cfm;

    if (cryptFilter !== null && cryptFilter !== undefined) {
      cfm = cryptFilter.get("CFM");
    }

    if (!cfm || cfm.name === "None") {
      return function cipherTransformFactoryBuildCipherConstructorNone() {
        return new NullCipher();
      };
    }

    if (cfm.name === "V2") {
      return function cipherTransformFactoryBuildCipherConstructorV2() {
        return new ARCFourCipher(buildObjectKey(num, gen, key, false));
      };
    }

    if (cfm.name === "AESV2") {
      return function cipherTransformFactoryBuildCipherConstructorAESV2() {
        return new AES128Cipher(buildObjectKey(num, gen, key, true));
      };
    }

    if (cfm.name === "AESV3") {
      return function cipherTransformFactoryBuildCipherConstructorAESV3() {
        return new AES256Cipher(key);
      };
    }

    throw new _util.FormatError("Unknown crypto method");
  }