function allocThreadID() {
            var nextID = nextAvailableThreadIDs[0];
            if (nextID === 0) {
              return growThreadCountAndReturnNextAvailable();
            }
            nextAvailableThreadIDs[0] = nextAvailableThreadIDs[nextID];
            return nextID;
          }