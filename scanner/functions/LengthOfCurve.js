function LengthOfCurve(geomAdaptor, UMin, UMax, segments = 5) {
  let point1 = new THREE.Vector3(), point2 = new THREE.Vector3(), arcLength = 0, gpPnt = new oc.gp_Pnt();
  for (let s = UMin; s <= UMax; s += (UMax - UMin) / segments){
    geomAdaptor.D0(s, gpPnt);
    point1.set(gpPnt.X(), gpPnt.Y(), gpPnt.Z());
    if (s == UMin) {
      point2.copy(point1);
    } else {
      arcLength += point1.distanceTo(point2);
    }
    point2.copy(point1);
  }
  return arcLength;
}