constructor(dict, fileId, password) {
      var filter = dict.get("Filter");

      if (!(0, _primitives.isName)(filter, "Standard")) {
        throw new _util.FormatError("unknown encryption method");
      }

      this.dict = dict;
      var algorithm = dict.get("V");

      if (!Number.isInteger(algorithm) || algorithm !== 1 && algorithm !== 2 && algorithm !== 4 && algorithm !== 5) {
        throw new _util.FormatError("unsupported encryption algorithm");
      }

      this.algorithm = algorithm;
      var keyLength = dict.get("Length");

      if (!keyLength) {
        if (algorithm <= 3) {
          keyLength = 40;
        } else {
          var cfDict = dict.get("CF");
          var streamCryptoName = dict.get("StmF");

          if ((0, _primitives.isDict)(cfDict) && (0, _primitives.isName)(streamCryptoName)) {
            cfDict.suppressEncryption = true;
            var handlerDict = cfDict.get(streamCryptoName.name);
            keyLength = handlerDict && handlerDict.get("Length") || 128;

            if (keyLength < 40) {
              keyLength <<= 3;
            }
          }
        }
      }

      if (!Number.isInteger(keyLength) || keyLength < 40 || keyLength % 8 !== 0) {
        throw new _util.FormatError("invalid key length");
      }

      var ownerPassword = (0, _util.stringToBytes)(dict.get("O")).subarray(0, 32);
      var userPassword = (0, _util.stringToBytes)(dict.get("U")).subarray(0, 32);
      var flags = dict.get("P");
      var revision = dict.get("R");
      var encryptMetadata = (algorithm === 4 || algorithm === 5) && dict.get("EncryptMetadata") !== false;
      this.encryptMetadata = encryptMetadata;
      var fileIdBytes = (0, _util.stringToBytes)(fileId);
      var passwordBytes;

      if (password) {
        if (revision === 6) {
          try {
            password = (0, _util.utf8StringToString)(password);
          } catch (ex) {
            (0, _util.warn)("CipherTransformFactory: " + "Unable to convert UTF8 encoded password.");
          }
        }

        passwordBytes = (0, _util.stringToBytes)(password);
      }

      var encryptionKey;

      if (algorithm !== 5) {
        encryptionKey = prepareKeyData(fileIdBytes, passwordBytes, ownerPassword, userPassword, flags, revision, keyLength, encryptMetadata);
      } else {
        var ownerValidationSalt = (0, _util.stringToBytes)(dict.get("O")).subarray(32, 40);
        var ownerKeySalt = (0, _util.stringToBytes)(dict.get("O")).subarray(40, 48);
        var uBytes = (0, _util.stringToBytes)(dict.get("U")).subarray(0, 48);
        var userValidationSalt = (0, _util.stringToBytes)(dict.get("U")).subarray(32, 40);
        var userKeySalt = (0, _util.stringToBytes)(dict.get("U")).subarray(40, 48);
        var ownerEncryption = (0, _util.stringToBytes)(dict.get("OE"));
        var userEncryption = (0, _util.stringToBytes)(dict.get("UE"));
        var perms = (0, _util.stringToBytes)(dict.get("Perms"));
        encryptionKey = createEncryptionKey20(revision, passwordBytes, ownerPassword, ownerValidationSalt, ownerKeySalt, uBytes, userPassword, userValidationSalt, userKeySalt, ownerEncryption, userEncryption, perms);
      }

      if (!encryptionKey && !password) {
        throw new _util.PasswordException("No password given", _util.PasswordResponses.NEED_PASSWORD);
      } else if (!encryptionKey && password) {
        var decodedPassword = decodeUserPassword(passwordBytes, ownerPassword, revision, keyLength);
        encryptionKey = prepareKeyData(fileIdBytes, decodedPassword, ownerPassword, userPassword, flags, revision, keyLength, encryptMetadata);
      }

      if (!encryptionKey) {
        throw new _util.PasswordException("Incorrect Password", _util.PasswordResponses.INCORRECT_PASSWORD);
      }

      this.encryptionKey = encryptionKey;

      if (algorithm >= 4) {
        var cf = dict.get("CF");

        if ((0, _primitives.isDict)(cf)) {
          cf.suppressEncryption = true;
        }

        this.cf = cf;
        this.stmf = dict.get("StmF") || identityName;
        this.strf = dict.get("StrF") || identityName;
        this.eff = dict.get("EFF") || this.stmf;
      }
    }