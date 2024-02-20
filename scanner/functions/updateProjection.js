function updateProjection()
{
  vecA
    .attr("x2", xRange(aX))
    .attr("y2", yRange(aY));

   vecB
    .attr("x2", xRange(bX))
    .attr("y2", yRange(bY));

  var magA = Math.sqrt((aY * aY) + (aX * aX));
  var magB = Math.sqrt((bY * bY) + (bX * bX));
  var dotProduct = (aX * bX) + (aY * bY);

  var multiplierA = dotProduct / (magA * magA);
  var projAX = aX * multiplierA;
  var projAY = aY * multiplierA;

  projection
    .attr("x1", xRange(projAX))
    .attr("y1", yRange(projAY))
    .attr("x2", xRange(bX))
    .attr("y2", yRange(bY));

  dotProductText.text("Dot Product = " + dotProduct.toFixed(3));
  dotProductBX.text(bX.toFixed(2));
  dotProductAX.text(" × " + aX.toFixed(2));

  dotProductBY.text(bY.toFixed(2));
  dotProductAY.text(" × " + aY.toFixed(2));

  projectionA
    .attr("x1", xRange(0))
    .attr("y1", yRange(0))
    .attr("x2", xRange(projAX))
    .attr("y2", yRange(projAY));

  projectionA.style("opacity", (mouseIsDown && !activeVectorIsB) ? 0.0 : 0.8);
  projection.style("opacity", (mouseIsDown && !activeVectorIsB) ? 0.0 : 0.4);

  dotProductLine
    .attr("x2", xRangeDotProduct(dotProduct));

  dotProductCircle
    .attr("cx", xRangeDotProduct(dotProduct));
}