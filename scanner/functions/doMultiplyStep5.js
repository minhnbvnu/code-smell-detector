function doMultiplyStep5()
{
  nCompletedStep4++;

  if (nCompletedStep4 == 2)
  {
    n++;
    doMultiplyStep();
  }
}