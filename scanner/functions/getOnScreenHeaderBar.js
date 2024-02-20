function getOnScreenHeaderBar() {
    for (var x = 0; x < headerBars.length; x++) {
      if (headerBars[x].isActive) return headerBars[x];
    }
  }