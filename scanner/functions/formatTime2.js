function formatTime2(ms) {
    let formatted;
    if (ms < 10) {
      formatted = "".concat(ms.toFixed(2), "ms");
    } else if (ms < 100) {
      formatted = "".concat(ms.toFixed(1), "ms");
    } else if (ms < 1e3) {
      formatted = "".concat(ms.toFixed(0), "ms");
    } else {
      formatted = "".concat((ms / 1e3).toFixed(2), "s");
    }
    return formatted;
  }