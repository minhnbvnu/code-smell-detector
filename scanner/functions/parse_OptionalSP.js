function parse_OptionalSP() {
        var result0, result1;

        result0 = [];
        result1 = parse_SP();
        while (result1 !== null) {
          result0.push(result1);
          result1 = parse_SP();
        }
        return result0;
      }