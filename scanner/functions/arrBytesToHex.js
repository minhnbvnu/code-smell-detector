function arrBytesToHex(bytes) {
        return bytes.map(function(x) {
          return padLeft(x.toString(16), 2);
        }).join("");
      }