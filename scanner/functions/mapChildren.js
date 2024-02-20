function mapChildren(children, func, context) {
              if (children == null) {
                return children;
              }
              var result = [];
              var count = 0;
              mapIntoArray(children, result, "", "", function(child) {
                return func.call(context, child, count++);
              });
              return result;
            }