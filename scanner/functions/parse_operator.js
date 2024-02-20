function parse_operator() {
        var result0;

        result0 = parse_required();
        if (result0 === null) {
          result0 = parse_blockMerge();
          if (result0 === null) {
            result0 = parse_multivalued();
            if (result0 === null) {
              result0 = parse_dontencode();
            }
          }
        }
        return result0;
      }