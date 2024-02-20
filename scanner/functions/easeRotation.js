function easeRotation(t, num) {
    t = Maf.mod(t, 1);
    return easings.InOutQuint(t) * Math.PI * num;
  }