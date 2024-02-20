function normalizeWhitePointToD65(sourceWhitePoint, XYZ_In, result) {

    var LMS = result;
    matrixProduct(BRADFORD_SCALE_MATRIX, XYZ_In, LMS);

    var LMS_D65 = tempNormalizeMatrix;
    convertToD65(sourceWhitePoint, LMS, LMS_D65);

    matrixProduct(BRADFORD_SCALE_INVERSE_MATRIX, LMS_D65, result);
  }