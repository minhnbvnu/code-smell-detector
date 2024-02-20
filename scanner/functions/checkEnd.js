function checkEnd(logsLocation) {
      count[logsLocation] -= 1
      if (Object.keys(count).every(k => count[k] <= 0)) {
        killAll()
        done()
      }
    }