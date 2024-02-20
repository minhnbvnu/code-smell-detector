function getRelativeTime() {
    const currentTime = getCurrentTime();

    if (currentTimelineData) {
      if (currentTimelineData.startTime === 0) {
        currentTimelineData.startTime = currentTime - TIME_OFFSET;
      }

      return currentTime - currentTimelineData.startTime;
    }

    return 0;
  }