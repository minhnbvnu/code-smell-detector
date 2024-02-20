function proj3d_coordPix(dr, nShoot, cosrot, sinrot, f, nPix){

    //normalize shooting direction and direction of camera coordinate 1
    // (in-place change of array reference nShoot but harmless)

    var norm=Math.sqrt(nShoot[0]*nShoot[0]+nShoot[1]*nShoot[1]
		       +nShoot[2]*nShoot[2]);
    for(var i=0; i<3; i++){
	nShoot[i]/=norm;
    }

    // assume at first a horizontally held camera (rotation=0, 
    // horizontal edge e1Sensor has no z coordinate) and rotate 
    // the camera later on by rotating the pixel coordinates

    var normEdge1=Math.sqrt(nShoot[0]*nShoot[0]+nShoot[1]*nShoot[1]);
    var e1Sensor=[nShoot[1]/normEdge1, -nShoot[0]/normEdge1, 0];

    // calculate vertical (yPixel) camera/sensor  edge  in the
    // direction of increasing yPix by the cross product 

    var e2Sensor=[]; 

    e2Sensor[0]=nShoot[1]*e1Sensor[2] - nShoot[2]*e1Sensor[1];
    e2Sensor[1]=nShoot[2]*e1Sensor[0] - nShoot[0]*e1Sensor[2];
    e2Sensor[2]=nShoot[0]*e1Sensor[1] - nShoot[1]*e1Sensor[0];

 
    // calculate object distance parallel  to shooting direction
    // and test if object projection is sufficiently far outside of
    // the screen or object is behind the camera; if so, return  [0,0]
    // !!cos(angle)=drParLen/drLen, tan(angle)=36/2/f

    var drParLen=0;
    for(var i=0; i<3; i++){
	drParLen+=dr[i]*nShoot[i]; //can be negative if object behind camera
    }
    var drLen=Math.sqrt(dr[0]*dr[0]+dr[1]*dr[1]+dr[2]*dr[2]);
    if(drParLen/drLen<0.5){ // !!cos(angle)=drParLen/drLen, tan(angle)=36/2/f
 	//console.log("transform3d: dr=",dr," Warning: drParLen/drLen<=0.5");
	return [0,0,false];
    }




    // calculate scaling factor [pixel/m] for a 24X36mm film reference

    var scale=f*nPix/(36*drParLen);


    // calculate pixel coordinates of horizontal camera 
    // with the above pinhole formulas

    var xPix=0; for (var i=0;i<3; i++){xPix +=scale*dr[i]*e1Sensor[i];}
    var yPix=0; for (var i=0;i<3; i++){yPix +=scale*dr[i]*e2Sensor[i];}

    // rotate camera/sensor anticlockwise, i.e., rotate pixels clockwise

    //var cosrot=Math.cos(rotation);
    //var sinrot=Math.sin(rotation);
    var xPixRot= cosrot*xPix+sinrot*yPix;
    var yPixRot=-sinrot*xPix+cosrot*yPix;

    if(false){
	console.log("\nproj3d_coordPix: dr=",dr,
		    "\n  nShoot=  ",nShoot,
		    "\n  cosrot",parseFloat(cosrot).toFixed(2),
		    "\n  sinrot",parseFloat(sinrot).toFixed(2),
		    "\n  f",parseFloat(f).toFixed(0),
		    "\n  nPix",parseFloat(nPix).toFixed(0),
		    "\n  e1Sensor=",e1Sensor,
		    "\n  e2Sensor=",e2Sensor,
		    "\n  drLen=  ",parseFloat(drLen).toFixed(1),
		    "\n  drParLen=  ",parseFloat(drParLen).toFixed(1),
                    "\n  scale[Pix/m]=",parseFloat().toFixed(2),
		    "\n  final: xPix=",parseFloat(xPixRot).toFixed(0),
		    " yPix=",parseFloat(yPixRot).toFixed(0)
		   );
    }
    return [xPixRot,yPixRot,true];
}