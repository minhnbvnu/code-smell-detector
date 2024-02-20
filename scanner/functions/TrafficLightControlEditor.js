function TrafficLightControlEditor(trafficObjects,
				   xRelEditor,yRelEditor){


  this.isActive=false; // set true/false as callback in control_gui.js

  // create image repositories

  this.knobYellow = new Image();
  this.knobYellow.src="figs/knobYellow.png";
  this.buttonDone = new Image();
  this.buttonDone.src="figs/buttonDone.png";

  this.cycleTimes=[30,40,50,60,80,100,120];
  this.cycleTimeIndex=3;
  this.cycleTime=this.cycleTimes[this.cycleTimeIndex];
  this.cycleTimesPix=[];


  this.doubleSliders=[]; // as many elements as active or passive TLs

  var iTL=0;
  for(var i=0; i<trafficObjects.trafficObj.length; i++){
    var trafficObj=trafficObjects.trafficObj[i];
    if(trafficObj.type==="trafficLight"){
      this.doubleSliders[iTL]={
	id: trafficObj.id, // same as corresponding trafficObject
        //isDisplayed: false, // true only if trafficObject is TL on road
        isActive: ((iTL<2) ? true : false), // true if added to control !!!
        isActive_xyPix: [0,0],
        toRed:  {isActive: false, relValue: 0.2+iTL*0.3, xyPix: [0,0]},//!!!
        toGreen: {isActive: false, relValue: 0.6-iTL*0.3, xyPix: [0,0]}//!!!
      };
      console.log("TrafficLightControlEditor Cstr: iTL=",iTL,
		  " this.doubleSliders[iTL]=",this.doubleSliders[iTL]);
      this.doubleSliders[iTL].toRed.relValue=Math.max(0, Math.min(1,this.doubleSliders[iTL].toRed.relValue)); //!!!
      this.doubleSliders[iTL].toGreen.relValue=Math.max(0, Math.min(1,this.doubleSliders[iTL].toGreen.relValue));//!!!

      iTL++;//!!!
    }
  }
  this.nTL=iTL;

  // basic graphics properties

  this.xRelEditor=xRelEditor;
  this.yRelEditor=yRelEditor;
  this.wrel=0.7;  // width relative to minimum of canvas width,height 
  this.hrel=this.wrel*(0.2+0.08*this.nTL);

    
}