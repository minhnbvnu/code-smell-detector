function drawSim() {
//##################################################


    // (0) redefine graphical aspects of road (arc radius etc) using
    // responsive design if canvas has been resized 
    // isSmartphone defined in updateSim
 
    var relTextsize_vmin=(isSmartphone) ? 0.03 : 0.02; //xxx
    var textsize=relTextsize_vmin*Math.min(canvas.width,canvas.height);



    if ((canvas.width!=simDivWindow.clientWidth)
	||(canvas.height != simDivWindow.clientHeight)){
	hasChanged=true;
	canvas.width  = simDivWindow.clientWidth;
        canvas.height  = simDivWindow.clientHeight;
	aspectRatio=canvas.width/canvas.height;
	refSizePix=Math.min(canvas.height,canvas.width/critAspectRatio);

	scale=refSizePix/refSizePhys; // refSizePhys=constant unless mobile

      updateDimensions();
      trafficObjs.calcDepotPositions(canvas); 

	if(true){
	    console.log("haschanged=true: new canvas dimension: ",
		        canvas.width," X ",canvas.height);
	}


    }

 
    // (1) update heading of all vehicles rel. to road axis
    // (for some reason, strange rotations at beginning)

    
  // (2) reset transform matrix and draw background
  // (only needed if changes, or something needs to be wiped off
  // (overtaking ban) plus "reminders" for lazy browsers

  ctx.setTransform(1,0,0,1,0,0);
  if(drawBackground){
    if(hasChanged||(itime<=10) || (itime%50==0) || userCanvasManip
      || (!drawRoad) || banButtonClicked){
      ctx.drawImage(background,0,0,canvas.width,canvas.height);
      backgroundJustDrawn=true; // MT 2020-01
      
    }
  }

  // MT 2020 need to reset here because drawBackground condition needs
  // banButtonClicked state from previous step to wipe out lifted ban

  banButtonClicked=false;


    // (3) draw mainroad
    // (always drawn; but changedGeometry=true necessary
    // if changed (it triggers building a new lookup table). 
    // Otherwise, road drawn at old position

    
  var changedGeometry=userCanvasManip || hasChanged||(itime<=1);
  mainroad.draw(roadImg1,roadImg2,scale,changedGeometry);


 
  // (4) draw vehicles (obstacleImg here empty, only needed for interface)

  mainroad.drawVehicles(carImg,truckImg,obstacleImgs,scale,vmin_col,vmax_col);

  // (4a) draw traffic signs (banButtonClicked => control_gui.js) MT 2020-01
  //console.log("banButtonClicked=",banButtonClicked," banIsActive=",banIsActive);

  if(backgroundJustDrawn||banButtonClicked){ // MT 2020-01
 
    var sizeSignPix=0.1*refSizePix;
    var vOffset=1.4*nLanes_main*laneWidth; // in v direction, pos if right

    var xPixUp=mainroad.get_xPix(uBeginUp,vOffset,scale);
    var yPixUp=mainroad.get_yPix(uBeginUp,vOffset,scale);
    var xPixEnd=mainroad.get_xPix(uEndUp,vOffset,scale);
    var yPixEnd=mainroad.get_yPix(uEndUp,vOffset,scale);
    var xPixBan=mainroad.get_xPix(uBeginBan+0.1*straightLen,-0.5*vOffset,scale);
    var yPixBan=mainroad.get_yPix(uBeginBan+0.1*straightLen,-0.5*vOffset,scale);

        // center sign (the drawing coords denote the left upper corner)

    xPixUp -= 0.5*sizeSignPix;
    yPixUp -= 0.5*sizeSignPix;
    xPixEnd -= 0.5*sizeSignPix;
    yPixEnd -= 0.5*sizeSignPix;

    ctx.setTransform(1,0,0,1,0,0); 
    ctx.drawImage(signUphillImg,xPixUp,yPixUp,sizeSignPix,sizeSignPix);
    ctx.drawImage(signFreeImg,xPixEnd,yPixEnd,sizeSignPix,sizeSignPix);
    if(banIsActive){// defined/changed in control_gui.js
	  ctx.drawImage(signTruckOvertakingBan,xPixBan,yPixBan,
			sizeSignPix,sizeSignPix);
    }

  }

  // (5a) draw traffic objects 

  if(userCanDropObjects&&(!isSmartphone)){
    trafficObjs.draw(scale);
  }

  // (5b) draw speedlimit-change select box

  ctx.setTransform(1,0,0,1,0,0); 
  drawSpeedlBox();



    // (6) draw simulated time

  displayTime(time,textsize);


    // (7) draw the speed colormap (as of 2020-01 drawColormap=false)

  if(drawColormap){
      displayColormap(0.22*refSizePix,
                 0.43*refSizePix,
                 0.1*refSizePix, 0.2*refSizePix,
		 vmin_col,vmax_col,0,100/3.6);
  }


  // reset even-oriented graphic switches (MT 2020-01)
  
  hasChanged=false; // window dimension has changed (responsive design)
  backgroundJustDrawn=false; // MT 2020-01 only redraw signs etc if necessary
  

  // revert to neutral transformation at the end!
  
  ctx.setTransform(1,0,0,1,0,0);
  
}