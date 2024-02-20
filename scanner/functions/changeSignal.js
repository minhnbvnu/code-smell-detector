function changeSignal()
{
  currentSigFx++;
  if (currentSigFx >= sigFxs.length)
  {
    currentSigFx = 0;
  }
  sigFx = sigFxs[currentSigFx];
  updateSignals();
  doMultiply();
}