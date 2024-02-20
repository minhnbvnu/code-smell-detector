function scheduleAutoUpdate(stream) {
    autoUpdate = setTimeout(function() {
      tick(false);
      stream.queue(
        overwrite + stampLine(createFormattedStamp(), lastLine)
      );
      scheduleAutoUpdate(stream);
    }, opts.realTime);
  }