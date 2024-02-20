function parse_LinkValue() {
        var result0, result1, result2, result3, result4, result5;
        var pos0, pos1;

        pos0 = pos;
        pos1 = pos;
        if (input.charCodeAt(pos) === 60) {
          result0 = "<";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"<\"");
          }
        }
        if (result0 !== null) {
          result1 = parse_URIReference();
          if (result1 !== null) {
            if (input.charCodeAt(pos) === 62) {
              result2 = ">";
              pos++;
            } else {
              result2 = null;
              if (reportFailures === 0) {
                matchFailed("\">\"");
              }
            }
            if (result2 !== null) {
              result3 = parse_OptionalSP();
              if (result3 !== null) {
                result4 = [];
                result5 = parse_LinkParams();
                while (result5 !== null) {
                  result4.push(result5);
                  result5 = parse_LinkParams();
                }
                if (result4 !== null) {
                  result0 = [result0, result1, result2, result3, result4];
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, href, params) {
            var link = {};
            params.forEach(function (param) {
              link[param[0]] = param[1];
            });
            link.href = href;
            return link;
          })(pos0, result0[1], result0[4]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }