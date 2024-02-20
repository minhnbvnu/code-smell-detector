function Speedometer(speedoImg,speedMax,sizeRel,
		     xRel,yRel){
    this.backgroundImg=speedoImg;
    this.speedMax=speedMax; // max speed [m/s] for this particular speedoImg
    this.sizeRel=sizeRel;
    this.xRel=xRel;
    this.yRel=yRel;
    this.aspectImg=speedoImg.naturalWidth/speedoImg.naturalHeight;
    if(false){
	console.log(" speedoImg.naturalWidth=",speedoImg.naturalWidth,
		    " speedoImg.naturalHeight=",speedoImg.naturalHeight);
    }
}