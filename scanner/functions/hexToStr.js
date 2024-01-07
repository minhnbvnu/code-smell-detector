function hexToStr(a, size) {
    if (size === 1) {
      return String.fromCharCode(a[0], a[1]);
    }

    if (size === 3) {
      return String.fromCharCode(a[0], a[1], a[2], a[3]);
    }

    return String.fromCharCode.apply(null, a.subarray(0, size + 1));
  }