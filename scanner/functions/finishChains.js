function finishChains(chainNodes)
{
  for (var i=0, l=chainNodes.length; i<l; i++) {
    chainNodes[i].didChange(null);
  }
}