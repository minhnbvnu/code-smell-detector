function CalcNormal(V0, V1, V2) {
  var A = new Array();   var B = new Array(); 
  for (var i = 0; i < 3; i++) {
    A[i] = V0[i] - V1[i];
    B[i] = V2[i] - V1[i];
  }
  A = CalcCross(A, B);
  var Length = Math.sqrt(A[0]*A[0] + A[1]*A[1] + A[2]*A[2]); 
  for (var i = 0; i < 3; i++) A[i] = A[i] / Length;
  A[3] = 1;
  return A;
}