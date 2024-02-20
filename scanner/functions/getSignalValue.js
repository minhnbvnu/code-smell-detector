function getSignalValue(kernelIndex)
{
  var index = kernelIndex + kernelShift;
  var value = (index >= 0 && index < signalPixels.length) ? signalPixels[index] : 0.0;
  return value;
}