function setBin(bin)
{
  binNumber = bin % 8;
  if (binNumber < 0) {
    binNumber = 7;
  }
  updateBasis();
}