function drawMovingBackground(uObs){
//##################################################

    var iLowerTile=Math.floor( (traj_y(uObs)-yBegin)/sizeBgPhys);
    var iLeftTile=Math.floor( (traj_x(0)-xBegin)/sizeBgPhys); 

  //!! change also call of mainroad.draw method 
  // if x observer from moving to fixed!

  //var xLeftPix= scale*(iLeftTile*sizeBgPhys  + xBegin-traj_x(uObs));//moving
    var xLeftPix= scale*(iLeftTile*sizeBgPhys  + xBegin-traj_x(0));//fixed

    var yTopPix =-scale*(iLowerTile*sizeBgPhys + yBegin-traj_y(uObs));//moving


    if(drawBackground&&(hasChanged||(itime<=2) || (itime===20) || relObserver 
			|| (!drawRoad))){

	var sizeScreenImg=scale*sizeBgPhys;
	
        // lower left tile
	ctx.setTransform(1,0,0,1,xLeftPix,yTopPix);
        ctx.drawImage(background,0,0,sizeScreenImg,sizeScreenImg);

        // upper left tile
	ctx.setTransform(1,0,0,1,xLeftPix,yTopPix-scale*sizeBgPhys);
        ctx.drawImage(background,0,0,sizeScreenImg,sizeScreenImg);

 
       // lower right tile
	ctx.setTransform(1,0,0,1,xLeftPix+scale*sizeBgPhys,yTopPix);
        ctx.drawImage(background,0,0,sizeScreenImg,sizeScreenImg);
 

        // upper right tile
	ctx.setTransform(1,0,0,1,xLeftPix+scale*sizeBgPhys,yTopPix-scale*sizeBgPhys);
        ctx.drawImage(background,0,0,sizeScreenImg,sizeScreenImg);
 
    }
    if(false){
	console.log(
	    "drawing moving background: traj_x(uObs)=",traj_x(uObs),
	    " traj_y(uObs)=",traj_y(uObs),
	    "\n  sizeBgPhys=",sizeBgPhys,
	    "\n  lower tile: j=",iLowerTile," yTopPix=",yTopPix,
	    "yTopPhys=",yTopPix/
	    "\n  upper tile: j=",iLowerTile-1," yTopPix=",yTopPix-scale*sizeBgPhys,
	    "yTopPhys=",yTopPix/scale-sizeBgPhys
	   // "\nleft tile: i=",iLeftTile," xLeftPix=",xLeftPix,
	   // "\nright tile:      xLeftPix=",xLeftPix+scale*sizeBgPhys
	);
    }
}