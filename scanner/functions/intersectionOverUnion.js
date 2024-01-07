function intersectionOverUnion(boxes, i, j) {
	  var iCoord = boxes.subarray(i * 4, i * 4 + 4);
	  var jCoord = boxes.subarray(j * 4, j * 4 + 4);
	  var yminI = Math.min(iCoord[0], iCoord[2]);
	  var xminI = Math.min(iCoord[1], iCoord[3]);
	  var ymaxI = Math.max(iCoord[0], iCoord[2]);
	  var xmaxI = Math.max(iCoord[1], iCoord[3]);
	  var yminJ = Math.min(jCoord[0], jCoord[2]);
	  var xminJ = Math.min(jCoord[1], jCoord[3]);
	  var ymaxJ = Math.max(jCoord[0], jCoord[2]);
	  var xmaxJ = Math.max(jCoord[1], jCoord[3]);
	  var areaI = (ymaxI - yminI) * (xmaxI - xminI);
	  var areaJ = (ymaxJ - yminJ) * (xmaxJ - xminJ);

	  if (areaI <= 0 || areaJ <= 0) {
	    return 0.0;
	  }

	  var intersectionYmin = Math.max(yminI, yminJ);
	  var intersectionXmin = Math.max(xminI, xminJ);
	  var intersectionYmax = Math.min(ymaxI, ymaxJ);
	  var intersectionXmax = Math.min(xmaxI, xmaxJ);
	  var intersectionArea = Math.max(intersectionYmax - intersectionYmin, 0.0) * Math.max(intersectionXmax - intersectionXmin, 0.0);
	  return intersectionArea / (areaI + areaJ - intersectionArea);
	}