function createIterable(array) {
        return {
          '@@iterator': function() {
            let i = 0;
            return {
              next() {
                const next = {
                  value: i < array.length ? array[i] : undefined,
                  done: i === array.length,
                };
                i++;
                return next;
              },
            };
          },
        };
      }