function countChildren(children) {
              var n = 0;
              mapChildren(children, function() {
                n++;
              });
              return n;
            }