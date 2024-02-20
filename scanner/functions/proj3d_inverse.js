function proj3d_inverse(xPix, yPix, dz, nShoot, rotation, f, nPix){

    //normalize shooting direction and direction of camera coordinate 1
    // (in-place change of array reference nShoot but harmless)

    var norm=Math.sqrt(nShoot[0]*nShoot[0]+nShoot[1]*nShoot[1]
		       +nShoot[2]*nShoot[2]);
    for(var i=0; i<3; i++){
	nShoot[i]/=norm;
    }


    // calculate sensor edges of horizontally held camera 
    // as in proj3d_coordPix !!! externalize as separate helper function!!


    var normEdge1=Math.sqrt(nShoot[0]*nShoot[0]+nShoot[1]*nShoot[1]);
    var e1Sensor=[nShoot[1]/normEdge1, -nShoot[0]/normEdge1, 0];

    var e2Sensor=[]; 
    e2Sensor[0]=nShoot[1]*e1Sensor[2] - nShoot[2]*e1Sensor[1];
    e2Sensor[1]=nShoot[2]*e1Sensor[0] - nShoot[0]*e1Sensor[2];
    e2Sensor[2]=nShoot[0]*e1Sensor[1] - nShoot[1]*e1Sensor[0];


    // start bei rotating camera to horizontal such that 
    // sensor edge e1 has no z component 

    var cosrot=Math.cos(rotation);
    var sinrot=Math.sin(rotation);
    var xPixHoriz= cosrot*xPix-sinrot*yPix;
    var yPixHoriz=+sinrot*xPix+cosrot*yPix;

    // calculate coefficients of 2X2 eq system A (dx,dy)=b

    var scale=f*nPix/36;

    var a11=xPixHoriz*nShoot[0] - scale*e1Sensor[0];
    var a12=xPixHoriz*nShoot[1] - scale*e1Sensor[1];
    var a21=yPixHoriz*nShoot[0] - scale*e2Sensor[0];
    var a22=yPixHoriz*nShoot[1] - scale*e2Sensor[1];

    var b1=dz * (scale*e1Sensor[2] - xPixHoriz*nShoot[2]);
    var b2=dz * (scale*e2Sensor[2] - yPixHoriz*nShoot[2]);

    // solve linear system and return results

    var dy=(a21*b1-a11*b2)/(a21*a12-a11*a22);
    var dx=(b1-a12*dy)/a11;
    return [dx,dy,dz];


}