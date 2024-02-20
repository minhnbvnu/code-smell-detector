function parseRawDelay(delay) {
        var parsedDelay = Math.floor(parseInt(delay, 10));
        return typeof parsedDelay === "number" && !nativeIsNaN(parsedDelay) ? parsedDelay : delay;
      }