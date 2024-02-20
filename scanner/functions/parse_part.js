function parse_part() {
        var result0;
        
        result0 = parse_raw();
        if (result0 === null) {
          result0 = parse_comment();
          if (result0 === null) {
            result0 = parse_section();
            if (result0 === null) {
              result0 = parse_partial();
              if (result0 === null) {
                result0 = parse_special();
                if (result0 === null) {
                  result0 = parse_reference();
                  if (result0 === null) {
                    result0 = parse_buffer();
                  }
                }
              }
            }
          }
        }
        return result0;
      }