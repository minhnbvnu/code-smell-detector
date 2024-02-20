function affineTransformImage(dr0, dr1, dr2, nPix1, nPix2, nShoot, 
			      cosrot,sinrot, f, screenSize){

    // the two object edges in increasing xPix and yPix (=pix1,pix2) direction
    
    var e1=[dr1[0]-dr0[0], dr1[1]-dr0[1], dr1[2]-dr0[2]];
    var e2=[dr2[0]-dr0[0], dr2[1]-dr0[1], dr2[2]-dr0[2]];
  
    // distance surface center - camera (dr=dr0+0.5*(dr1-dr0+dr2-dr0)=0.5*(dr1+dr2)
 
    var dr=[0.5*(dr1[0]+dr2[0]), 
	    0.5*(dr1[1]+dr2[1]),
	    0.5*(dr1[2]+dr2[2])];

    // points near the center to calculate difference quotient

    var eps=0.01;
    var dr1loc=[dr[0]+eps*e1[0], dr[1]+eps*e1[1], dr[2]+eps*e1[2]];
    var dr2loc=[dr[0]+eps*e2[0], dr[1]+eps*e2[1], dr[2]+eps*e2[2]];

    //console.log("affineTransformImage: dr0=",dr0," dr1=",dr1," dr2=",dr2);

    // calculate coordPix -> translational part of transform
    // calculate coordPix[12] -> differential projections to get the 
    // non-translational elements of transform


    var projResults=proj3d_coordPix(dr, nShoot,cosrot,sinrot,f,screenSize);

    var projResults1=proj3d_coordPix(dr1loc,nShoot,cosrot,sinrot,f,screenSize);
    var projResults2=proj3d_coordPix(dr2loc,nShoot,cosrot,sinrot,f,screenSize);

    var coordPix=projResults;
    var coordPix1=projResults1;
    var coordPix2=projResults2;

    var affTraf00=1/nPix1 * (coordPix1[0]-coordPix[0])/eps;
    var affTraf01=1/nPix1 * (coordPix1[1]-coordPix[1])/eps;
    var affTraf10=1/nPix2 * (coordPix2[0]-coordPix[0])/eps;
    var affTraf11=1/nPix2 * (coordPix2[1]-coordPix[1])/eps;
    var successFlag=projResults[2] && projResults1[2] && projResults2[2];

    return [affTraf00,affTraf01,affTraf10,affTraf11,
	    coordPix[0],coordPix[1],successFlag];
}