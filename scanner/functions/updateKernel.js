function updateKernel()
{
  for (var i = 0; i < FFTSize; i++)
  {
    var value = i < kernel.length ? kernel[i] : 0.0;

    kernelPoints[i]
      .attr("cx", xRange(i))
      .attr("cy", yRangeTime(value));

    kernelSticks[i]
      .attr("x1", xRange(i))
      .attr("y1", yRangeTime(0))
      .attr("x2", xRange(i))
      .attr("y2", yRangeTime(value));
  }
}