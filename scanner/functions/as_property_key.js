function as_property_key() {
        var tmp = S.token;
        switch (tmp.type) {
          case "operator":
            if (!KEYWORDS[tmp.value]) unexpected();
          case "num":
          case "string":
          case "name":
          case "keyword":
          case "atom":
            next();
            return "" + tmp.value;
          case "punc":
            expect("[");
            var key = maybe_assign();
            expect("]");
            return key;
          default:
            unexpected();
        }
    }