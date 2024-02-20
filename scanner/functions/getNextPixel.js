function getNextPixel(segmentStart, segmentEnd, currentPixel) {
  const vInc = [segmentStart[0] < segmentEnd[0] ? 1 : -1,
              segmentStart[1] < segmentEnd[1] ? 1 : -1];
         
  const nextX = currentPixel[0] + (segmentStart[0] < segmentEnd[0] ?  +1 : 0);
  const nextY = currentPixel[1] + (segmentStart[1] < segmentEnd[1] ?  +1 : 0);
  
  // position of the edge to the next pixel on the line 'segmentStart'->'segmentEnd'
  const alphaX = (nextX - segmentStart[0])/ (segmentEnd[0] - segmentStart[0]);
  const alphaY = (nextY - segmentStart[1])/ (segmentEnd[1] - segmentStart[1]);
  
  // neither value is valid
  if ((alphaX <= 0.0 || alphaX > 1.0) && (alphaY <= 0.0 || alphaY > 1.0)) {
    return [undefined, undefined];
  }
    
  if (alphaX <= 0.0 || alphaX > 1.0) { // only alphaY is valid
    return [currentPixel[0], currentPixel[1] + vInc[1]];
  }

  if (alphaY <= 0.0 || alphaY > 1.0) { // only alphaX is valid
    return [currentPixel[0] + vInc[0], currentPixel[1]];
  }
    
  return alphaX < alphaY ? [currentPixel[0]+vInc[0], currentPixel[1]] :
                           [currentPixel[0],         currentPixel[1] + vInc[1]];
}