function hexHMACMD5(k, d) {
        return rstr2hex(rawHMACMD5(k, d));
      }