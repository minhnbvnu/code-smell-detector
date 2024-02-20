function pagesBeforeRef(kidRef) {
        var total = 0;
        var parentRef;
        return xref.fetchAsync(kidRef).then(function (node) {
          if (!node) {
            return null;
          }
          parentRef = node.getRaw('Parent');
          return node.getAsync('Parent');
        }).then(function (parent) {
          if (!parent) {
            return null;
          }
          return parent.getAsync('Kids');
        }).then(function (kids) {
          if (!kids) {
            return null;
          }
          var kidPromises = [];
          var found = false;
          for (var i = 0; i < kids.length; i++) {
            var kid = kids[i];
            assert(isRef(kid), 'kids must be a ref');
            if (kid.num === kidRef.num) {
              found = true;
              break;
            }
            kidPromises.push(xref.fetchAsync(kid).then(function (kid) {
              if (kid.has('Count')) {
                var count = kid.get('Count');
                total += count;
              } else { // page leaf node
                total++;
              }
            }));
          }
          if (!found) {
            error('kid ref not found in parents kids');
          }
          return Promise.all(kidPromises).then(function () {
            return [total, parentRef];
          });
        });
      }