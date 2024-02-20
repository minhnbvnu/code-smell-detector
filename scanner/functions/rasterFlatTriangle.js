function rasterFlatTriangle( flat0, flat1, other ) {

  //console.log("RFT:\n%s\n%s\n%s", String(flat0), String(flat1), String(other));
  const points = [];
  assert(flat0[1] === flat1[1], 'not a flat triangle');
  assert(other[1] !== flat0[1], 'not a triangle');
  assert(flat0[0] !== flat1[0], 'not a triangle');

  if (flat0[0] > flat1[0]) //guarantees that flat0 is always left of flat1
  {
    const tmp = flat0;
    flat0 = flat1;
    flat1 = tmp;
  }

  let leftRasterPos = [other[0] <<0, other[1] <<0];
  let rightRasterPos = leftRasterPos.slice(0);
  points.push(leftRasterPos.slice(0));
  const yDir = other[1] < flat0[1] ? +1 : -1;
  const yStart = leftRasterPos[1];
  const yBeyond= (flat0[1] <<0) + yDir;
  let prevLeftRasterPos;
  let prevRightRasterPos;

  for (let y = yStart; (y*yDir) < (yBeyond*yDir); y+= yDir) {
    do {
      points.push( leftRasterPos.slice(0));
      prevLeftRasterPos = leftRasterPos;
      leftRasterPos = getNextPixel(other, flat0, leftRasterPos);
    } while (leftRasterPos[1]*yDir <= y*yDir);
    leftRasterPos = prevLeftRasterPos;
    
    do {
      points.push( rightRasterPos.slice(0));
      prevRightRasterPos = rightRasterPos;
      rightRasterPos = getNextPixel(other, flat1, rightRasterPos);
    } while (rightRasterPos[1]*yDir <= y*yDir);
    rightRasterPos = prevRightRasterPos;
    
    for (let x = leftRasterPos[0]; x <= rightRasterPos[0]; x++) {
      points.push([x, y]);
    }
  }
  
  return points;
}