function activateSpeedlBox(xPixUser,yPixUser){

  var sizePix=Math.min(canvas.width, canvas.height);


  speedlBoxActive=false;

  var relWidth=0.10;  // rel size and position of the graphical select box
  var relHeight=0.025*speedlBoxAttr.limits.length; // rel to the smaller dim
  var relDistx=0.10;  // center-center
  var relDisty=0.00;
  var relTextsize_vmin=(isSmartphone) ? 0.03 : 0.02;

  var results=trafficObjs.selectSignOrTL(xPixUser,yPixUser);
  var obj=results[1];
  console.log("\n\nitime=",itime," in activateSpeedlBox (canvas_gui)",
	      " results=",results," type=",obj.type);

  if(results[0]){
    if(obj.type==='speedLimit'){
      speedlBoxAttr.obj=obj;
      speedlBoxActive=true; // then, drawSpeedlSelectBox drawn

      speedlBoxAttr.sizePix=sizePix;
      speedlBoxAttr.xPixLeft=xPixUser+sizePix*(relDistx-0.5*relWidth);
      speedlBoxAttr.yPixTop=yPixUser+sizePix*(relDisty-0.5*relHeight);
      if(xPixUser>0.8*canvas.width){
	speedlBoxAttr.xPixLeft -=2*sizePix*relDistx;
      }
      if(yPixUser>0.8*canvas.height){
	speedlBoxAttr.yPixTop -=0.5*sizePix*relHeight;
      }
      if(yPixUser<0.2*canvas.height){
	speedlBoxAttr.yPixTop +=0.5*sizePix*relHeight;
      }
      speedlBoxAttr.wPix=sizePix*relWidth;
      speedlBoxAttr.hPix=sizePix*relHeight;
      speedlBoxAttr.hBoxPix=speedlBoxAttr.hPix/speedlBoxAttr.limits.length;

      var nLimit=speedlBoxAttr.limits.length;
      var hPix=speedlBoxAttr.hPix;
      var yPixTop=speedlBoxAttr.yPixTop;

      speedlBoxAttr.textsize=relTextsize_vmin*sizePix;
    }
  }
  var returnVal=results[0]&&(obj.type==='speedLimit');
  console.log("  end activateSpeedlBox: speedlBoxActive=",speedlBoxActive,
	      " returnVal=",returnVal);
  return returnVal;
}