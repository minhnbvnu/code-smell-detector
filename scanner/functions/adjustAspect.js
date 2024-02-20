function adjustAspect(e) {

      var w = zm.maxGifWidth;
      var h = Math.round(e.Event.Height / e.Event.Width * zm.maxGifWidth);
      return {
        w: w,
        h: h
      };

    }