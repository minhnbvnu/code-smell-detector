function inputSignal(d)
{
  return Math.sin(d)
          + 0.5 * Math.sin(d * 3)
          + 0.25 * Math.sin(d * 5)
          //+ 0.10 * Math.sin(d * 10)
          ; 
}