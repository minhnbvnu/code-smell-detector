function setupSamples() {
  var targetPhase = 0;

  for (i = 0; i < samplePoints.length; i++)
  {
    samplePoints[i].remove();
    sampleNumbers[i].remove();
  }

  samplePoints = [];
  sampleNumbers = [];
  samplePhase = [];

  for (i = 0; i < 8 + RATE_FACTOR * 12; i++)
  {
    var cos = Math.cos(targetPhase - (Math.PI / 2));
    var sin = -Math.sin(targetPhase - (Math.PI / 2));

    var x = xRange(cos);
    var y = yRange(sin);

    var textOffsetX = -7;
    var textOffsetY = -sin * 4;
    var textAnchor = "end";
    if (cos > 0)
    {
      textAnchor = "begin";
      textOffsetX = 7;
    }
    if (sin < 0)
    {
      textOffsetY += -sin * 6
    }

    samplePoints.push(
      vis.append('svg:circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', 2)
        .attr('stroke-width', 1.5)
        .attr('stroke', 'steelblue')
        .attr('fill', 'steelblue')
        .attr('opacity', 0.0)
    );
    sampleNumbers.push(
      vis.append('text')
        .attr("text-anchor", textAnchor)
        .attr("x", x + textOffsetX)
        .attr("y", y + textOffsetY)
        .attr('stroke', "lightgrey")
        .attr('stroke-width', 0.5)
        .attr('opacity', 0.0)
        .text(i+1)
      );

    samplePhase.push(targetPhase);

    targetPhase += samplingRate;
  }
}