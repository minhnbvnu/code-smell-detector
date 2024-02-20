function d3_geo_pathCentroidLineStart() {
    var x0, y0;
    if (d3_geo_centroidDimension !== 1) {
      if (d3_geo_centroidDimension < 1) {
        d3_geo_centroidDimension = 1;
        d3_geo_centroidX = d3_geo_centroidY = d3_geo_centroidZ = 0;
      } else return;
    }
    d3_geo_pathCentroid.point = function(x, y) {
      d3_geo_pathCentroid.point = nextPoint;
      x0 = x, y0 = y;
    };
    function nextPoint(x, y) {
      var dx = x - x0, dy = y - y0, z = Math.sqrt(dx * dx + dy * dy);
      d3_geo_centroidX += z * (x0 + x) / 2;
      d3_geo_centroidY += z * (y0 + y) / 2;
      d3_geo_centroidZ += z;
      x0 = x, y0 = y;
    }
  }