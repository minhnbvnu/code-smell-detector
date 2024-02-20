function displayColormap(xCenterPix, yCenterPix, widthPix, heightPix,
		      vmin_colMap, vmax_colMap, vmin_colDisplay, vmax_colDisplay){

    console.log("displayColormap: widthPix=",widthPix);
    ctx.setTransform(1,0,0,1,xCenterPix-0.5*widthPix,
		     yCenterPix-0.5*heightPix); 


    // draw the actual speed colormap

    var nvals=30; // nvals color values
    var nlegend=6;  // nlegend numbers displayed in legend
    var hBox=heightPix/nvals;

    for(var i=0; i<nvals; i++){
	var xLeft=0;
	var yTop=i*hBox;
        var val=vmin_colDisplay+i/(nvals-1)*(vmax_colDisplay-vmin_colDisplay);
        ctx.fillStyle=colormapSpeed(val,vmin_colMap,vmax_colMap,"car",false,0,true);
        ctx.fillRect(xLeft,yTop,widthPix,hBox); 
    }


    // draw the legend

    // var textsize=0.11*heightPix; //!!
    var textsize=0.18*widthPix;
    ctx.font=textsize+'px Arial';
    var textwidthPix=4*textsize;
    ctx.fillStyle="#FFFFFF";

    // white bg box

    ctx.fillRect(widthPix,-0.5*textsize,textwidthPix,heightPix+textsize); 

    // speed labels

    for (var i=0; i<nlegend; i++){
	var v=vmin_colMap+i*(vmax_colDisplay-vmin_colDisplay)/(nlegend-1);
	var xLeft=widthPix+0.2*textsize;
	var yBot=0.4*textsize+(heightPix-0)*i/(nlegend-1);
        var speedStr=Math.round(3.6*v)+" km/h";
        ctx.fillStyle="#000000";
	ctx.fillText(speedStr,xLeft,yBot);
    }

    // revert to neutral transformation at the end!

    ctx.setTransform(1,0,0,1,0,0); 

}