function Translate(M, Dx, Dy, Dz) {
  var T = [
  [1,0,0,Dx],
  [0,1,0,Dy],
  [0,0,1,Dz],
  [0,0,0,1]
  ];
  return MMulti(T, M);
}