function IOU(boxes, i, j) {
        var yminI = Math.min(boxes.get(i, 0), boxes.get(i, 2));
        var xminI = Math.min(boxes.get(i, 1), boxes.get(i, 3));
        var ymaxI = Math.max(boxes.get(i, 0), boxes.get(i, 2));
        var xmaxI = Math.max(boxes.get(i, 1), boxes.get(i, 3));
        var yminJ = Math.min(boxes.get(j, 0), boxes.get(j, 2));
        var xminJ = Math.min(boxes.get(j, 1), boxes.get(j, 3));
        var ymaxJ = Math.max(boxes.get(j, 0), boxes.get(j, 2));
        var xmaxJ = Math.max(boxes.get(j, 1), boxes.get(j, 3));
        var areaI = (ymaxI - yminI) * (xmaxI - xminI);
        var areaJ = (ymaxJ - yminJ) * (xmaxJ - xminJ);
        if (areaI <= 0 || areaJ <= 0) {
            return 0.0;
        }
        var intersectionYmin = Math.max(yminI, yminJ);
        var intersectionXmin = Math.max(xminI, xminJ);
        var intersectionYmax = Math.min(ymaxI, ymaxJ);
        var intersectionXmax = Math.min(xmaxI, xmaxJ);
        var intersectionArea = Math.max(intersectionYmax - intersectionYmin, 0.0) *
            Math.max(intersectionXmax - intersectionXmin, 0.0);
        return intersectionArea / (areaI + areaJ - intersectionArea);
    }