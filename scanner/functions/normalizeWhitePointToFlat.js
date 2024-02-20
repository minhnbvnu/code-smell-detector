function normalizeWhitePointToFlat(sourceWhitePoint, XYZ_In, result) {

    // In case the whitePoint is already flat then there is no need to do
    // normalization.
    if (sourceWhitePoint[0] === 1 && sourceWhitePoint[2] === 1) {
      result[0] = XYZ_In[0];
      result[1] = XYZ_In[1];
      result[2] = XYZ_In[2];
      return;
    }

    var LMS = result;
    matrixProduct(BRADFORD_SCALE_MATRIX, XYZ_In, LMS);

    var LMS_Flat = tempNormalizeMatrix;
    convertToFlat(sourceWhitePoint, LMS, LMS_Flat);

    matrixProduct(BRADFORD_SCALE_INVERSE_MATRIX, LMS_Flat, result);
  }