function suppressWeight(iouThreshold, scale, iou) {
	  var weight = Math.exp(scale * iou * iou);
	  return iou <= iouThreshold ? weight : 0.0;
	}