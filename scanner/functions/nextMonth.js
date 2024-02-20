function nextMonth() {
      // since the day is incremented at the start
      // of the loop below, we need to start at 0
      lastDay = 0;
      self.increment_month();
      dateIdx = 0;
      initMonth();
    }