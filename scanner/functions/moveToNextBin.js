function moveToNextBin()
{
  //nCompletedLastStep++;

  if (true)//nCompletedLastStep == 2)
  {
    n = 0;

    while(cosTexts.length > 0) {
      cosTexts.pop().remove();
    }

    while(sigRealTexts.length >0)
    {
      sigRealTexts.pop().remove(); 
    }

    while(sigImagTexts.length >0)
    {
      sigImagTexts.pop().remove(); 
    }

    while(cosRealTexts.length >0)
    {
      cosRealTexts.pop().remove(); 
    }

    while(sinImagTexts.length >0)
    {
      sinImagTexts.pop().remove(); 
    }

    while(sinTexts.length > 0) {
      sinTexts.pop().remove();
    }

    switchBin();
  }
}