function pointRotate(point, angle, origin){
  const r = angleToRadians(angle || 0);

  if (!origin || (origin[0] === 0 && origin[1] === 0)){
    return rotate(point, r);
  }
  else {
    // See: https://math.stackexchange.com/questions/1964905/rotation-around-non-zero-point
    const p0 = point.map((c, i) => c - origin[i]);
    const rotated = rotate(p0, r);
    return rotated.map((c, i) => c + origin[i]);
  }
}