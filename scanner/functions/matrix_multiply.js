function matrix_multiply(ae, be, res){
  var a11 = ae[0][0], a12 = ae[0][1], a13 = ae[0][2],  a14 = ae[0][3]
  var a21 = ae[1][0], a22 = ae[1][1], a23 = ae[1][2],  a24 = ae[1][3]
  var a31 = ae[2][0], a32 = ae[2][1], a33 = ae[2][2],  a34 = ae[2][3]
  var a41 = ae[3][0], a42 = ae[3][1], a43 = ae[3][2],  a44 = ae[3][3]

  var b11 = be[0][0], b12 = be[0][1], b13 = be[0][2],  b14 = be[0][3]
  var b21 = be[1][0], b22 = be[1][1], b23 = be[1][2],  b24 = be[1][3]
  var b31 = be[2][0], b32 = be[2][1], b33 = be[2][2],  b34 = be[2][3]
  var b41 = be[3][0], b42 = be[3][1], b43 = be[3][2],  b44 = be[3][3]

  res[0][0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41
  res[0][1] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42
  res[0][2] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43
  res[0][3] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44

  res[1][0] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41
  res[1][1] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42
  res[1][2] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43
  res[1][3] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44

  res[2][0] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41
  res[2][1] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42
  res[2][2] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43
  res[2][3] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44

  res[3][0] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41
  res[3][1] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42
  res[3][2] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43
  res[3][3] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44
}