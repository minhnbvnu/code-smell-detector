function interpolateRotate(from, middle, to) {
    if (to === from) return to;
    return animValue.interpolate({
      inputRange: [0, step, 1],
      outputRange: [from, middle, to]
    });
  }