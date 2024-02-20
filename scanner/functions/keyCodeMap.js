function keyCodeMap(code){
      // Coded keys
      if (codedKeys.indexOf(code) >= 0) {
        p.keyCode = code;
        if (code === p.INS) {
          p.keyCode = 155;
        }
        return PConstants.CODED;
      }
      switch(code){
        case 13:
          return 10;  // Enter
        case 46:
          return 127; // Delete
      }
      return code;
    }