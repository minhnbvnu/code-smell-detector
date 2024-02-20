function scratchMemory(n) {
      if(bits.isPow2(n)) {
        return 0
      }
      return 2 * n + 4 * bits.nextPow2(2*n + 1)
    }