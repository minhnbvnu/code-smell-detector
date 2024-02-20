function addCurve( curve, orbitAngle, orbitRadius, angle, length, cylinderRadius, scale, rotation ) {

  var points = Math.floor( 50 * length / Math.PI );

  var p = new THREE.Vector3();
  var vertices = [];

  const step = .01;
  const prev = new THREE.Vector3();
  const tmp = new THREE.Vector3();
  let angleInc = 0;

  for(let a=angle; a<angle+length; a+=step) {

    const res = curve.getPoint(a/Maf.TAU);
    tmp.copy(res);
    const n = res.clone().sub(prev).normalize();

    const vector = new THREE.Vector3( 0,1.1*orbitRadius, 0 );
    vector.applyAxisAngle( n, orbitAngle+angleInc );
    res.add(vector);

    p.copy(res).multiplyScalar(.05);
    const f = p.clone();
    f.x *= scale.x;
    f.y *= scale.y;
    const d = Math.sqrt(f.x*f.x+f.y*f.y);
    const aa = Math.atan2(f.y,f.x);
    f.x = d * Math.cos(aa+rotation);
    f.y = d * Math.sin(aa+rotation);
    vertices.push( f );
    angleInc += .02;
  }

  var path = new THREE.CatmullRomCurve3(vertices);
  var geometry = new TubeBufferGeometry( path, vertices.length, (i) => Maf.parabola(i,.1)*cylinderRadius*i, 18, !true );

  return geometry;

}