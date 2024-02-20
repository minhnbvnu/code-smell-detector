function recomputePolygons(ax, ay, ndx, z) {

    // we get screen X/Y - need to translate
    // to SVG points
    //console.log ("recompute with",ax,"&",ay);
    var svg = document.getElementById('zsvg');
    var pt = svg.createSVGPoint();
    pt.x = ax;
    pt.y = ay;
    var svgP = pt.matrixTransform(svg.getScreenCTM().inverse());

    $scope.circlePoints[ndx].x = Math.round(svgP.x);
    $scope.circlePoints[ndx].y = Math.round(svgP.y);

    // get related polygon set
    var zi = $scope.circlePoints[ndx].zoneIndex;
    var newPoints = "";
    for (var i = 0; i < $scope.circlePoints.length; i++) {
      if ($scope.circlePoints[i].zoneIndex == zi) {
        newPoints = newPoints + " " + $scope.circlePoints[i].x + "," + $scope.circlePoints[i].y;
      }
      //console.log ("recomputed polygon:", newPoints);
    }
    // console.log ("OLD ZONE FOR:"+zi+" is "+$scope.zoneArray[zi].coords );
    //console.log ("NEW ZONE FOR:"+zi+" is "+newPoints);
    $scope.zoneArray[zi].coords = newPoints;

    //console.log ("INDEX="+ndx+" DRAG="+svgP.x+":"+svgP.y);

  }