function escapeJSStringsForInstructionScripts(input) {
              var escaped = JSON.stringify(input);
              return escaped.replace(regexForJSStringsInScripts, function(match) {
                switch (match) {
                  case "<":
                    return "\\u003c";
                  case "\u2028":
                    return "\\u2028";
                  case "\u2029":
                    return "\\u2029";
                  default: {
                    throw new Error("escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React");
                  }
                }
              });
            }