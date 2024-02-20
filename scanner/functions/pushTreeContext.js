function pushTreeContext(baseContext, totalChildren, index) {
              var baseIdWithLeadingBit = baseContext.id;
              var baseOverflow = baseContext.overflow;
              var baseLength = getBitLength(baseIdWithLeadingBit) - 1;
              var baseId = baseIdWithLeadingBit & ~(1 << baseLength);
              var slot = index + 1;
              var length = getBitLength(totalChildren) + baseLength;
              if (length > 30) {
                var numberOfOverflowBits = baseLength - baseLength % 5;
                var newOverflowBits = (1 << numberOfOverflowBits) - 1;
                var newOverflow = (baseId & newOverflowBits).toString(32);
                var restOfBaseId = baseId >> numberOfOverflowBits;
                var restOfBaseLength = baseLength - numberOfOverflowBits;
                var restOfLength = getBitLength(totalChildren) + restOfBaseLength;
                var restOfNewBits = slot << restOfBaseLength;
                var id = restOfNewBits | restOfBaseId;
                var overflow = newOverflow + baseOverflow;
                return {
                  id: 1 << restOfLength | id,
                  overflow
                };
              } else {
                var newBits = slot << baseLength;
                var _id = newBits | baseId;
                var _overflow = baseOverflow;
                return {
                  id: 1 << length | _id,
                  overflow: _overflow
                };
              }
            }