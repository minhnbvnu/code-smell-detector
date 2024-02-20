function compareByFrequency (a, b) {
      const freA = a[1]
      const freB = b[1]
      if (freA < freB) {
        return 1
      }
      if (freA > freB) {
        return -1
      }
      return 0
    }