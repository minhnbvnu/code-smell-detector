function blockReturned(blockNumber, index) {
      if (blockNumber == 0) {
        FIRST_BLOCK_RETURNED = true;
      } else if (blockNumber == 1) {
        SECOND_BLOCK_RETURNED = true;
      } else if (blockNumber == 2) {
        THIRD_BLOCK_RETURNED = true;
      }

      // Callback for this connection
      if (FIRST_BLOCK_RETURNED && SECOND_BLOCK_RETURNED && THIRD_BLOCK_RETURNED) {
        finishedTesting(index);
      }
    }