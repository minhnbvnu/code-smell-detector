function d3_scale_logn(x) {
    return -Math.log(x > 0 ? 0 : -x) / Math.LN10;
  }