function parse_bareChar() {
        var result0;
        
        if (/^[a-zA-Z0-9_$]/.test(input.charAt(pos))) {
          result0 = input.charAt(pos);
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("[a-zA-Z0-9_$]");
          }
        }
        return result0;
      }