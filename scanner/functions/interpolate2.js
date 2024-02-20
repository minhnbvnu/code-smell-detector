function interpolate2(start, end, clamped) {
      return interpolate(
        isTarget ? end : start,
        isTarget ? start : end,
        clamped
      );
    }