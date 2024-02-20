function friendlyDuration(durationish) {
    if (isNumber(durationish)) {
      return Duration.fromMillis(durationish);
    } else if (Duration.isDuration(durationish)) {
      return durationish;
    } else if (typeof durationish === "object") {
      return Duration.fromObject(durationish);
    } else {
      throw new InvalidArgumentError("Unknown duration argument " + durationish + " of type " + typeof durationish);
    }
  }