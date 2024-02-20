function printWarning(level, format, args) {
              {
                var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
                var stack = ReactDebugCurrentFrame2.getStackAddendum();
                if (stack !== "") {
                  format += "%s";
                  args = args.concat([stack]);
                }
                var argsWithFormat = args.map(function(item) {
                  return String(item);
                });
                argsWithFormat.unshift("Warning: " + format);
                Function.prototype.apply.call(console[level], console, argsWithFormat);
              }
            }