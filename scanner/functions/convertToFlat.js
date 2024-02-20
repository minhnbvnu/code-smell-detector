function convertToFlat(sourceWhitePoint, LMS, result) {
      result[0] = LMS[0] * 1 / sourceWhitePoint[0];
      result[1] = LMS[1] * 1 / sourceWhitePoint[1];
      result[2] = LMS[2] * 1 / sourceWhitePoint[2];
  }