function parse_TiNS() {
        var result0;
        
        if (input.substr(pos, 8) === "Titanium") {
          result0 = "Titanium";
          pos += 8;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"Titanium\"");
          }
        }
        if (result0 === null) {
          if (input.substr(pos, 2) === "Ti") {
            result0 = "Ti";
            pos += 2;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"Ti\"");
            }
          }
          if (result0 === null) {
            if (input.substr(pos, 5) === "Alloy") {
              result0 = "Alloy";
              pos += 5;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("\"Alloy\"");
              }
            }
          }
        }
        return result0;
      }