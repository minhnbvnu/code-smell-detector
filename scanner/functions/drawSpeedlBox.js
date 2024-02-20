function drawSpeedlBox(){
  if(speedlBoxActive){
    //console.log("itime=",itime," in drawSpeedlBox (canvas)");
    //console.log("yUser=",yUser," yPixUser=",yPixUser);

    var sizePix=speedlBoxAttr.sizePix;

    var xPixLeft=speedlBoxAttr.xPixLeft;
    var yPixTop=speedlBoxAttr.yPixTop;
    var wPix=speedlBoxAttr.wPix;
    var hPix=speedlBoxAttr.hPix;

    // (1) draw the white rectangular background box

    ctx.setTransform(1,0,0,1,0,0); 
    ctx.fillStyle="rgb(255,255,255)";
    ctx.fillRect(xPixLeft,yPixTop,wPix,hPix);

   // (2) draw the speedlimit options

    ctx.fillStyle="rgb(0,0,0)";
    ctx.font=speedlBoxAttr.textsize+'px Arial';
    var limits=speedlBoxAttr.limits;

    for(var i=0; i<limits.length; i++){
      var textStr=(limits[i]<200) ? limits[i]+" km/h" : "free";
      ctx.fillText(textStr,xPixLeft+0.01*sizePix,
  		   yPixTop+(i+0.7)*hPix/limits.length);
    }
  }
}