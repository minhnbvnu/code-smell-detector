function changeSpeedl(xPixUser,yPixUser){

  console.log("\n\nitime=",itime," in changeSpeedl (canvas_gui):",
	      " speedlBoxActive=",speedlBoxActive);
  if(speedlBoxActive){
 
    if( (xPixUser>speedlBoxAttr.xPixLeft)
	&& (xPixUser<speedlBoxAttr.xPixLeft+speedlBoxAttr.wPix)
	&& (yPixUser>speedlBoxAttr.yPixTop)
	&& (yPixUser<speedlBoxAttr.yPixTop+speedlBoxAttr.hPix)){
     
      console.log("  speedlBoxActive and clicked inside box!");
 
      var obj=speedlBoxAttr.obj;
      var nLimit=speedlBoxAttr.limits.length;

      var iSelect=Math.floor(nLimit*(yPixUser-speedlBoxAttr.yPixTop)/
			     speedlBoxAttr.hPix);
      obj.value=speedlBoxAttr.limits[iSelect];
      var fileIndex=(0.1*obj.value<13)
	? Math.round(0.1*obj.value) : 0;
      obj.image.src = "figs/speedLimit_"+(fileIndex)+"0.svg";
      //console.log("  traffic object of id=",obj.id,
//		  " has new speed limit ",obj.value);
    }
  }
  speedlBoxActive=false; // apply only once
  hasChanged=true;  // to draw the green background the next timestep
  console.log("  end changeSpeedl: traffic object of id=",
	      speedlBoxAttr.obj.id,
	      " type=",speedlBoxAttr.obj.type,
	      " has new speed limit ",speedlBoxAttr.obj.value,
	      " using image file ",speedlBoxAttr.obj.image.src);
 // a=gieskanne;
}