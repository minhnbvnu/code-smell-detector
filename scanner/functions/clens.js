function clenS(pp, arg_r, arg_i) {
    var sin_arg_r = sin(arg_r),
        cos_arg_r = cos(arg_r),
        sinh_arg_i = sinh(arg_i),
        cosh_arg_i = cosh(arg_i),
        r = 2 * cos_arg_r * cosh_arg_i,
        i = -2 * sin_arg_r * sinh_arg_i,
        j = pp.length - 1,
        hr = pp[j],
        hi1 = 0,
        hr1 = 0,
        hi = 0,
        hr2, hi2;
    while (--j >= 0) {
      hr2 = hr1;
      hi2 = hi1;
      hr1 = hr;
      hi1 = hi;
      hr = -hr2 + r*hr1 - i * hi1 + pp[j];
      hi = -hi2 + i*hr1 + r * hi1;
    }
    r = sin_arg_r * cosh_arg_i;
    i = cos_arg_r * sinh_arg_i;
    return [r * hr - i * hi, r * hi + i * hr];
  }