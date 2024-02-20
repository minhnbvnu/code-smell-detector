function parse____() {
        var result0, result1;
        
        result1 = parse_WhiteSpace();
        if (result1 === null) {
          result1 = parse_LineTerminatorSequence();
          if (result1 === null) {
            result1 = parse_Comment();
            if (result1 === null) {
              result1 = parse_Comma();
            }
          }
        }
        if (result1 !== null) {
          result0 = [];
          while (result1 !== null) {
            result0.push(result1);
            result1 = parse_WhiteSpace();
            if (result1 === null) {
              result1 = parse_LineTerminatorSequence();
              if (result1 === null) {
                result1 = parse_Comment();
                if (result1 === null) {
                  result1 = parse_Comma();
                }
              }
            }
          }
        } else {
          result0 = null;
        }
        return result0;
      }