function decrypt(data) {
        //debug ('-->deobfuscating '+data.length+' bytes using scheme:'+loginData.obfuscationScheme);
        var decodedVal;
        var scheme;
        if (data.substr(0,5) == '--Z--') {
          //debug ('unpacking');
          scheme = 'lzs';
          decodedVal = LZString.decompressFromUTF16(data.substr(5));
        } else {
          var bytes = CryptoJS.AES.decrypt(data.toString(), zm.cipherKey);
          decodedVal = bytes.toString(CryptoJS.enc.Utf8);
          scheme = 'aes';
        }

        //console.log ('-->decrypted ' + decodedVal);
        debug ('deobfuscate: before:'+data.length+' after:'+decodedVal.length+' scheme:'+scheme);
        var decodedJSON = JSON.parse(decodedVal);

        return decodedJSON;
      }