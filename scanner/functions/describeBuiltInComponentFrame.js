function describeBuiltInComponentFrame(name, source, ownerFn) {
              {
                if (prefix === void 0) {
                  try {
                    throw Error();
                  } catch (x) {
                    var match = x.stack.trim().match(/\n( *(at )?)/);
                    prefix = match && match[1] || "";
                  }
                }
                return "\n" + prefix + name;
              }
            }