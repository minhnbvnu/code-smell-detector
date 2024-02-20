function showLogicalCoords(xPixUser,yPixUser){

  var distanceMin=1e9;
  var irMin=-1;
  var uvMin=[1000,1000];
  for(var ir=0; ir<network.length; ir++){

    //returns [dist,uReturn,vLanes]
    var findResults=network[ir].findNearestDistanceTo(xUser,yUser);
    if (findResults[0]<distanceMin){
      distanceMin=findResults[0];
      uLaneMin=[findResults[1],findResults[2]];
      irMin=ir;
    }
  }

  var roadID=network[irMin].roadID;
  var u=uLaneMin[0];
  var lane=uLaneMin[1];

  var coordsStr="Road "+roadID+": u="+u.toFixed(1)+", lane="+lane.toFixed(0);
  //console.log("coordsStr=",coordsStr);
  var textsize=0.02*Math.min(canvas.width,canvas.height); // 2vw;
  var coordsStr_width=12*textsize;
  var coordsStr_height=1.2*textsize;
  var coordsStr_xlb=0.88*canvas.width-0.5*coordsStr_width;
  var coordsStr_ylb=0.88*canvas.height;

  ctx.setTransform(1,0,0,1,0,0);
  ctx.font=textsize+'px Arial';
  ctx.fillStyle="rgb(255,255,255)";
  ctx.fillRect(coordsStr_xlb,coordsStr_ylb-coordsStr_height,
		 coordsStr_width,coordsStr_height);
  ctx.fillStyle="rgb(0,0,0)";
  ctx.fillText(coordsStr, coordsStr_xlb+0.2*textsize, 
		 coordsStr_ylb-0.2*textsize);

}