function Loop() {
  if (Testing.LoopCount > Testing.LoopMax) return;
  var TestingStr = String(Testing.LoopCount);
  while (TestingStr.length < 3) TestingStr = "0" + TestingStr;
  MTrans = Translate(I, -Q[8].V[0], -Q[8].V[1], -Q[8].V[2]);
  MTrans = RotateX(MTrans, 1);
  MTrans = RotateY(MTrans, 3);
  MTrans = RotateZ(MTrans, 5);
  MTrans = Translate(MTrans, Q[8].V[0], Q[8].V[1], Q[8].V[2]);
  MQube = MMulti(MTrans, MQube);
  var i = 8;
  for (; i > -1; i--) {
    Q[i].V = VMulti(MTrans, Q[i].V);
  }
  DrawQube();
  Testing.LoopCount++;
  Loop();
}