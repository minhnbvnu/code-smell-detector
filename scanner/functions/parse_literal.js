function parse_literal() {
        var result0;

        if (/^[^^ "'<>`{|}]/.test(input.charAt(pos))) {
          result0 = input.charAt(pos);
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("[^^ \"'<>`{|}]");
          }
        }
        if (result0 === null) {
          result0 = parse_expression();
        }
        return result0;
      }