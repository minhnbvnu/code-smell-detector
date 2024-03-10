function TrafficObjects(canvas,nTL,nLimit,xRelDepot,yRelDepot,nRow,nCol){

  this.nRow=nRow;
  this.nCol=nCol; 
  this.n=nRow*nCol;
  this.xRelDepot=xRelDepot;
  this.yRelDepot=yRelDepot;
  this.nTL=Math.min(nTL,this.n);
  this.nLimit=Math.min(nLimit, this.n-this.nTL);
  this.nObst=Math.max(0, this.n-nTL-nLimit); // nTL,nLimit, not this,nTL,...

  this.nObstMax=10;

  // fixed size variables

  this.gapRel=0.01;          // relative spacing (sizeCanvas)
  this.sizeRel=0.08;         // relative size of passive graphical objects
  this.active_scaleFact=1.0; // pixel size factor active/passive objects
                             // other than obstacles (phys length relevant)
  this.lenPhys=25;       // physical length[m] of active obstacles
                             // (drawn by the road.draw methods)
  this.wPhys=10;         // 1..1.5 times road.lanewidth

  
  // variable size variables (updated in this.calcDepotPositions)
  
  this.sizeCanvas=Math.min(canvas.width, canvas.height);

  // general graph variables

  this.active_drawTopSign=true; // if true, a TL/sign above road is drawn
                             // if active (in any case, only one obstacle 
                             // on the dropped lane)
  this.active_drawBotSign=true; // if true, a TL/sign below road is drawn
                             // if active

  // create image repositories

  this.imgTLgreen = new Image();
  this.imgTLgreen.src="figs/trafficLight_green.png";
  this.imgTLred = new Image();
  this.imgTLred.src="figs/trafficLight_red.png";
  this.imgTyellow = new Image();
  this.imgTyellow.src="figs/trafficLight_yellow.png";

  this.imgSpeedlRepo = []; 
  for (var i=0; i<13; i++){
    this.imgSpeedlRepo[i]=new Image();
    this.imgSpeedlRepo[i].src = "figs/speedLimit_"+(i)+"0.svg";
  }

  this.imgObstRepo = []; 
  for (var i=0; i<Math.min(this.nObst, this.nObstMax); i++){
    this.imgObstRepo[i]=new Image();
    this.imgObstRepo[i].src = "figs/obstacle_"+(50+i)+".png";
    console.log("i=",i," this.imgObstRepo[i].src=",this.imgObstRepo[i].src);
  }


  
  // create all instances of trafficObj[]

  this.trafficObj=[];
  var initSpeedInd=[6,8,10,0,12,3,4,5,1,2]; // speed 60 km/h,80,100,free..
  for(var i=0; i<this.n; i++){

    var isTL=(i<this.nTL);
    var isSpeedl=(!isTL)&&(i<this.nTL+nLimit);
    var isObst=!(isTL||isSpeedl);

    var iSpeed=i-this.nTL;
    var iObst=i-this.nTL-this.nLimit;
    
    var img=(isTL) ? this.imgTLred : (isSpeedl)
      ? this.imgSpeedlRepo[initSpeedInd[iSpeed]] : this.imgObstRepo[iObst];
    if(true){
      console.log("TrafficObjects cstr: i=",i,
		  " img=",img," iObst=",iObst);
    }

    //#################################################################
    // xxx central object this.trafficObj[i]
    // object on road: isActive=true, u>=0,inDepot=isDragged=false 
    // object picked: isPicked=true, inDepot=false, isDragged and isActive
    //         can have both values 
    //         (isActive=true only if (!isDragged)&&(isActive in past)) 
    // object dragged: isDragged=true, isPicked=inDepot=isActive=false
    // object dropped on road => isActive=true, 
    //          isDragged=isPicked=inDepot=false
    // object dropped outside of road and not yet completely zoomed back =>
    //          isPicked=isDragged=isActive=inDepot=false
    //#################################################################

    this.trafficObj[i]={
      id:    (isTL) ? 100+i : (isSpeedl) ? 150+iSpeed : 50+iObst,
      type:  (isTL) ? "trafficLight" : (isSpeedl) ? "speedLimit" : "obstacle",
      image: (isTL) ? this.imgTLred : (isSpeedl)
	? this.imgSpeedlRepo[initSpeedInd[iSpeed]] : this.imgObstRepo[iObst],
      value: (isTL) ? "red" : (isObst) ? "null" : 10*initSpeedInd[iSpeed],
                                                 // speedlimit in km/h!!
      isActive: false, 
      inDepot:  true,
      isPicked: false,   // !! controlled by pickRoadOrObject (canvas_gui)
                         // ->this.pickObject
      isDragged: false,  // !! controlled by doDragging (canvas_gui)
                         // -> direct setting in canvas_gui
      road: 'void',      // only defined if isActive=true
      u: -1,             // physical long position [m] (<0 if !isActive)
                         // for graph focus, advanced by du=this.lenPhys/2 
                         // if obstacle 
      lane: -1,          // =round(v); isActive: 0 to road.nLanes-1,
                         // !isActive: -1
      len: this.lenPhys, //[m], for drawing of active obj of type "obstacle"
      width: this.wPhys, //[m], about 1-1.5*road.lanewidth 
      xPix: 42,          // actual pixel position (to be calculated later
      yPix: 42,          // in calcDepotPositions
      xPixSign1: 42,    // pixel pos of more distant active TL/speedl img
      yPixSign1: 42,    // to be calculated in draw(...)
      xPixSign2: 42,    // pixel pos of nearer active TL/speedl img
      yPixSign2: 42,
      xPixDepot: 42,     // xPix=xPixDepot if !isActive and 
      yPixDepot: 42      // graphics zoomed back to depot
    };

    if((this.trafficObj[i].type=="speedLimit") 
       &&(this.trafficObj[i].value==0)){
      this.trafficObj[i].value=300; // no speedlimit if index 0->00 km/h
    }

    
  } // loop over elements


  this.calcDepotPositions(canvas); // sets pixel sizes, positions

    
  // logging

  if(false){
    console.log("TrafficObjects Cstr: this.nTL=",this.nTL);
    for(var i=0; i<this.trafficObj.length; i++){
      console.log("TrafficObjects cstr: i=",i,
		  " value=",this.trafficObj[i].value,
		  " type=",this.trafficObj[i].type,
		  " id=",this.trafficObj[i].id,
		  " imgfile=",this.trafficObj[i].image.src,
		  " isActive=",this.trafficObj[i].isActive);
    }
  }

}