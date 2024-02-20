function validateContextBounds(context, threadID) {
            for (var i2 = context._threadCount | 0; i2 <= threadID; i2++) {
              context[i2] = context._currentValue2;
              context._threadCount = i2 + 1;
            }
          }