function DrawQube() {
  // calc current normals
  var CurN = new Array();
  var i = 5;
  Q.LastPx = 0;
  for (; i > -1; i--) CurN[i] = VMulti2(MQube, Q.Normal[i]);
  if (CurN[0][2] < 0) {
    if (!Q.Line[0]) { DrawLine(Q[0], Q[1]); Q.Line[0] = true; };
    if (!Q.Line[1]) { DrawLine(Q[1], Q[2]); Q.Line[1] = true; };
    if (!Q.Line[2]) { DrawLine(Q[2], Q[3]); Q.Line[2] = true; };
    if (!Q.Line[3]) { DrawLine(Q[3], Q[0]); Q.Line[3] = true; };
  }
  if (CurN[1][2] < 0) {
    if (!Q.Line[2]) { DrawLine(Q[3], Q[2]); Q.Line[2] = true; };
    if (!Q.Line[9]) { DrawLine(Q[2], Q[6]); Q.Line[9] = true; };
    if (!Q.Line[6]) { DrawLine(Q[6], Q[7]); Q.Line[6] = true; };
    if (!Q.Line[10]) { DrawLine(Q[7], Q[3]); Q.Line[10] = true; };
  }
  if (CurN[2][2] < 0) {
    if (!Q.Line[4]) { DrawLine(Q[4], Q[5]); Q.Line[4] = true; };
    if (!Q.Line[5]) { DrawLine(Q[5], Q[6]); Q.Line[5] = true; };
    if (!Q.Line[6]) { DrawLine(Q[6], Q[7]); Q.Line[6] = true; };
    if (!Q.Line[7]) { DrawLine(Q[7], Q[4]); Q.Line[7] = true; };
  }
  if (CurN[3][2] < 0) {
    if (!Q.Line[4]) { DrawLine(Q[4], Q[5]); Q.Line[4] = true; };
    if (!Q.Line[8]) { DrawLine(Q[5], Q[1]); Q.Line[8] = true; };
    if (!Q.Line[0]) { DrawLine(Q[1], Q[0]); Q.Line[0] = true; };
    if (!Q.Line[11]) { DrawLine(Q[0], Q[4]); Q.Line[11] = true; };
  }
  if (CurN[4][2] < 0) {
    if (!Q.Line[11]) { DrawLine(Q[4], Q[0]); Q.Line[11] = true; };
    if (!Q.Line[3]) { DrawLine(Q[0], Q[3]); Q.Line[3] = true; };
    if (!Q.Line[10]) { DrawLine(Q[3], Q[7]); Q.Line[10] = true; };
    if (!Q.Line[7]) { DrawLine(Q[7], Q[4]); Q.Line[7] = true; };
  }
  if (CurN[5][2] < 0) {
    if (!Q.Line[8]) { DrawLine(Q[1], Q[5]); Q.Line[8] = true; };
    if (!Q.Line[5]) { DrawLine(Q[5], Q[6]); Q.Line[5] = true; };
    if (!Q.Line[9]) { DrawLine(Q[6], Q[2]); Q.Line[9] = true; };
    if (!Q.Line[1]) { DrawLine(Q[2], Q[1]); Q.Line[1] = true; };
  }
  Q.Line = [false,false,false,false,false,false,false,false,false,false,false,false];
  Q.LastPx = 0;
}