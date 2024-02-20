function changeKernel()
{
  kernelIndex++;

  if (kernelIndex == kernels.length)
  {
    kernelIndex = 0;
  }

  kernel = kernels[kernelIndex];

  updateKernel();
  updateMagnitudes();
}