function getMonitorDimensions(mid) {

    for (var i = 0; i < monitors.length; i++) {

      if (mid == monitors[i].Monitor.Id) {

        
        return {
          width: monitors[i].Monitor.Width,
          height: monitors[i].Monitor.Height,
          orientation: monitors[i].Monitor.Orientation
        };
      }
    }

  }