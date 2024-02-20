function growThreadCountAndReturnNextAvailable() {
            var oldArray = nextAvailableThreadIDs;
            var oldSize = oldArray.length;
            var newSize = oldSize * 2;
            if (!(newSize <= 65536)) {
              {
                throw Error("Maximum number of concurrent React renderers exceeded. This can happen if you are not properly destroying the Readable provided by React. Ensure that you call .destroy() on it if you no longer want to read from it, and did not read to the end. If you use .pipe() this should be automatic.");
              }
            }
            var newArray = new Uint16Array(newSize);
            newArray.set(oldArray);
            nextAvailableThreadIDs = newArray;
            nextAvailableThreadIDs[0] = oldSize + 1;
            for (var _i = oldSize; _i < newSize - 1; _i++) {
              nextAvailableThreadIDs[_i] = _i + 1;
            }
            nextAvailableThreadIDs[newSize - 1] = 0;
            return oldSize;
          }