function Init(CubeSize) {
  // init/reset vars
  Origin.V = [150,150,20,1];
  Testing.LoopCount = 0;
  Testing.LoopMax = 50;
  Testing.TimeMax = 0;
  Testing.TimeAvg = 0;
  Testing.TimeMin = 0;
  Testing.TimeTemp = 0;
  Testing.TimeTotal = 0;
  Testing.Init = false;

  // transformation matrix
  MTrans = [
  [1,0,0,0],
  [0,1,0,0],
  [0,0,1,0],
  [0,0,0,1]
  ];
  
  // position information of qube
  MQube = [
  [1,0,0,0],
  [0,1,0,0],
  [0,0,1,0],
  [0,0,0,1]
  ];
  
  // entity matrix
  I = [
  [1,0,0,0],
  [0,1,0,0],
  [0,0,1,0],
  [0,0,0,1]
  ];
  
  // create qube
  Q[0] = new CreateP(-CubeSize,-CubeSize, CubeSize);
  Q[1] = new CreateP(-CubeSize, CubeSize, CubeSize);
  Q[2] = new CreateP( CubeSize, CubeSize, CubeSize);
  Q[3] = new CreateP( CubeSize,-CubeSize, CubeSize);
  Q[4] = new CreateP(-CubeSize,-CubeSize,-CubeSize);
  Q[5] = new CreateP(-CubeSize, CubeSize,-CubeSize);
  Q[6] = new CreateP( CubeSize, CubeSize,-CubeSize);
  Q[7] = new CreateP( CubeSize,-CubeSize,-CubeSize);
  
  // center of gravity
  Q[8] = new CreateP(0, 0, 0);
  
  // anti-clockwise edge check
  Q.Edge = [[0,1,2],[3,2,6],[7,6,5],[4,5,1],[4,0,3],[1,5,6]];
  
  // calculate squad normals
  Q.Normal = new Array();
  for (var i = 0; i < Q.Edge.length; i++) Q.Normal[i] = CalcNormal(Q[Q.Edge[i][0]].V, Q[Q.Edge[i][1]].V, Q[Q.Edge[i][2]].V);
  
  // line drawn ?
  Q.Line = [false,false,false,false,false,false,false,false,false,false,false,false];
  
  // create line pixels
  Q.NumPx = 9 * 2 * CubeSize;
  for (var i = 0; i < Q.NumPx; i++) CreateP(0,0,0);
  
  MTrans = Translate(MTrans, Origin.V[0], Origin.V[1], Origin.V[2]);
  MQube = MMulti(MTrans, MQube);

  var i = 0;
  for (; i < 9; i++) {
    Q[i].V = VMulti(MTrans, Q[i].V);
  }
  DrawQube();
  Testing.Init = true;
  Loop();
}