function compensateBlackPoint(sourceBlackPoint, XYZ_Flat, result) {

    // In case the blackPoint is already the default blackPoint then there is
    // no need to do compensation.
    if (sourceBlackPoint[0] === 0 &&
        sourceBlackPoint[1] === 0 &&
        sourceBlackPoint[2] === 0) {
      result[0] = XYZ_Flat[0];
      result[1] = XYZ_Flat[1];
      result[2] = XYZ_Flat[2];
      return;
    }

    // For the blackPoint calculation details, please see
    // http://www.adobe.com/content/dam/Adobe/en/devnet/photoshop/sdk/
    // AdobeBPC.pdf.
    // The destination blackPoint is the default blackPoint [0, 0, 0].
    var zeroDecodeL = decodeL(0);

    var X_DST = zeroDecodeL;
    var X_SRC = decodeL(sourceBlackPoint[0]);

    var Y_DST = zeroDecodeL;
    var Y_SRC = decodeL(sourceBlackPoint[1]);

    var Z_DST = zeroDecodeL;
    var Z_SRC = decodeL(sourceBlackPoint[2]);

    var X_Scale = (1 - X_DST) / (1 - X_SRC);
    var X_Offset = 1 - X_Scale;

    var Y_Scale = (1 - Y_DST) / (1 - Y_SRC);
    var Y_Offset = 1 - Y_Scale;

    var Z_Scale = (1 - Z_DST) / (1 - Z_SRC);
    var Z_Offset = 1 - Z_Scale;

    result[0] = XYZ_Flat[0] * X_Scale + X_Offset;
    result[1] = XYZ_Flat[1] * Y_Scale + Y_Offset;
    result[2] = XYZ_Flat[2] * Z_Scale + Z_Offset;
  }