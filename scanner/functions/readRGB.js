function readRGB(preference, image) {
  if (!preference) {
    return false;
  }
  if (preference === true) {
    return true;
  }
  if (image.getSamplesPerPixel() !== 3) {
    return false;
  }
  const interpretation = image.fileDirectory.PhotometricInterpretation;
  const interpretations = geotiffGlobals.photometricInterpretations;
  return (
    interpretation === interpretations.CMYK ||
    interpretation === interpretations.YCbCr ||
    interpretation === interpretations.CIELab ||
    interpretation === interpretations.ICCLab
  );
}