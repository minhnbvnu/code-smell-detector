function RotateX(M, Phi) {
  var a = Phi;
  a *= Math.PI / 180;
  var Cos = Math.cos(a);
  var Sin = Math.sin(a);
  var R = [
  [1,0,0,0],
  [0,Cos,-Sin,0],
  [0,Sin,Cos,0],
  [0,0,0,1]
  ];
  return MMulti(R, M);
}