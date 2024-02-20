function affineTransformGraphics(dr, e1, e2,  scale, nShoot, rotation, f, 
				 screenSize ){

    //console.log("affineTransformGraphics: dr=",dr);

    // normalize the direction vectors e1 and e2

    var e1abs=Math.sqrt(e1[0]*e1[0]+e1[1]*e1[1]+e1[2]*e1[2]);
    for (var i=0; i<3; i++){e1[i] /= e1abs;}

    var e2abs=Math.sqrt(e2[0]*e2[0]+e2[1]*e2[1]+e2[2]*e2[2]);
    for (var i=0; i<3; i++){e2[i] /= e2abs;}

    // distance from camera of points that are the physical equivalent
    // of 1 pixel off the center in the xPix and yPix direction 
    // of the graphical commands to calculate aff transform 
    // from the small differences

    var eps=1./scale; 
    var dr1=[dr[0]+eps*e1[0], dr[1]+eps*e1[1], dr[2]+eps*e1[2]];
    var dr2=[dr[0]+eps*e2[0], dr[1]+eps*e2[1], dr[2]+eps*e2[2]];

    // calculate screenPix -> translational part of affine transform
    // and screenPix1, screenPix2 to get the non-translational elements

    var cosrot=Math.cos(rotation);
    var sinrot=Math.sin(rotation);

    var projCenter=proj3d_coordPix(dr, nShoot,cosrot,sinrot,f,screenSize);
    var proj1     =proj3d_coordPix(dr1,nShoot,cosrot,sinrot,f,screenSize);
    var proj2     =proj3d_coordPix(dr2,nShoot,cosrot,sinrot,f,screenSize);

    var screenPixCenter=projCenter;
    var screenPix1=proj1;
    var screenPix2=proj2;

    var affTraf00=(screenPix1[0]-screenPixCenter[0]);
    var affTraf01=(screenPix1[1]-screenPixCenter[1]);
    var affTraf10=(screenPix2[0]-screenPixCenter[0]);
    var affTraf11=(screenPix2[1]-screenPixCenter[1]);

    var successFlag=projCenter[2] && proj1[2] && proj2[2];


    if(false){
	console.log("in transform3d.affineTransformGraphics:",
		    " scale="," screenSize=",screenSize);
	console.log("e1=",e1," e2=",e2);
	console.log("dr1=",dr1," dr2=",dr2);
	console.log("screenPixCenter=",screenPixCenter,
		    "\n screenPix1=",screenPix1,
		    "\n screenPix2=",screenPix2);
	aff=[affTraf00,affTraf01,affTraf10,affTraf11,
	     screenPixCenter[0],screenPixCenter[1]];
	console.log("affine trafo = ",aff);
    
    }
    return [affTraf00,affTraf01,affTraf10,affTraf11,
	    screenPixCenter[0],screenPixCenter[1],successFlag];
}