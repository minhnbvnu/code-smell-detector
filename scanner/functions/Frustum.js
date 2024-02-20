function Frustum(p0, p1, p2, p3, p4, p5) {

  this.planes = [

    (p0 !== undefined) ? p0 : new Plane(),
    (p1 !== undefined) ? p1 : new Plane(),
    (p2 !== undefined) ? p2 : new Plane(),
    (p3 !== undefined) ? p3 : new Plane(),
    (p4 !== undefined) ? p4 : new Plane(),
    (p5 !== undefined) ? p5 : new Plane()

  ];

}