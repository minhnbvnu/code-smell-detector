function encrypt(data) {
        var jsdata = JSON.stringify(data);
        var compress;

        if (loginData.obfuscationScheme == 'lzs') {
          compress = '--Z--'+LZString.compressToUTF16(jsdata);

        } else if (loginData.obfuscationScheme == 'aes') {
          compress = CryptoJS.AES.encrypt(jsdata, zm.cipherKey).toString();
        } else {
          log ('ERROR: obfuscation scheme:'+loginData.obfuscationScheme+' not recognized');
          return undefined;
        }

        debug ('obfuscate: original:'+jsdata.length+' obfuscated:'+compress.length+' scheme:'+loginData.obfuscationScheme);
        return compress;
      }