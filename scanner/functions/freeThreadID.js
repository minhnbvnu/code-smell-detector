function freeThreadID(id) {
            nextAvailableThreadIDs[id] = nextAvailableThreadIDs[0];
            nextAvailableThreadIDs[0] = id;
          }