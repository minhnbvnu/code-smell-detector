function transformVec3(m, v) {
  const x = v[0]*m[0] + v[1]*m[4] + v[2]*m[8]  + m[12];
  const y = v[0]*m[1] + v[1]*m[5] + v[2]*m[9]  + m[13];
  const z = v[0]*m[2] + v[1]*m[6] + v[2]*m[10] + m[14];
  const w = v[0]*m[3] + v[1]*m[7] + v[2]*m[11] + m[15];
  return [x/w, y/w, z/w]; //convert homogenous to Euler coordinates
}