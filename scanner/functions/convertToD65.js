function convertToD65(sourceWhitePoint, LMS, result) {
    var D65X = 0.95047;
    var D65Y = 1;
    var D65Z = 1.08883;

    result[0] = LMS[0] * D65X / sourceWhitePoint[0];
    result[1] = LMS[1] * D65Y / sourceWhitePoint[1];
    result[2] = LMS[2] * D65Z / sourceWhitePoint[2];
  }