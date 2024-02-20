function road(roadID,roadLen,laneWidth,nLanes,traj_x,traj_y,
	      densInitPerLane,speedInit,fracTruck,isRing,doGridding){



    //console.log("1. in road cstr: traj_x(0)=",traj_x(0));
    this.roadID=roadID;
    this.roadLen=roadLen;
    this.laneWidth=laneWidth;
    this.nLanes=nLanes;
  this.exportString="";

  
    // network related properties

    this.isRing=isRing;
    this.doGridding=(typeof doGridding === 'undefined') ? false : doGridding;
    this.inVehBuffer=0.9; // number of waiting vehicles; if>=1, updateBCup called
    this.iTargetFirst=0; // set by getTargetNeighbourhood: first veh in defined region

    this.offrampIDs=[]; // which offramps are attached to this road?
    this.offrampLastExits=[]; // locations? (increasing u)
    this.offrampToRight=[]; // offramp attached to the right?

    this.trafficLights=[]; // (jun17) introduce by this.addTrafficLight
                           // to model the traffic light->road operations.
                           // need separate array 
                           // since no virtual vehicles corresp. to green TL
                           // (all drawing is done by the 
                           // ObstacleTLDepot objects)


    // tactical and LC related global aspects

  this.waitTime=4;   // waiting time after passive LC to do an active LC
                       //similar value as default vehicle.dt_LC at cstr
  this.duTactical=-1e-6; // if duAntic>0 activate tactical changes 
                           // for mandat. LC
  this.uminLC=20;     // only allow lane changes for long coord u>uminLC 
  this.setTrucksAlwaysRight=true; //!! relates to trucks at inflow
  this.padding=20;    // this.mergeDiverge: visibility extension
                        // for origin drivers to target vehs
                        // both sides of actual merge/diverge zone

  this.paddingLTC=20; // this.mergeDiverge if merge && prioOwn: visibility  
                        // extension for target drivers to origin vehs
                        // only upstream of merging zone

    // drawing-related vatiables

  this.draw_scaleOld=0;
  this.nSegm=100;   //!! number of road segm=nSegm+1, not only drawing
  this.draw_curvMax=0.05; // maximum assmued curvature !!
  this.markVehsMerge=false; // for debugging
  this.drawVehIDs=false;// for debugging

  this.draw_x=[];  // arrays defined in the draw(..) method
  this.draw_y=[];
  this.draw_phi=[];
  this.draw_cosphi=[];
  this.draw_sinphi=[];

    // construct vehicle array
    // u=long logical coordinate; i=0: first vehicle=maximum u
    // =(n-1)/n*roadLen
    // lane or v is transversal coordinate

  this.veh=[];
  this.initRegularVehicles(densInitPerLane,fracTruck);
/*
    var nveh=Math.floor(this.nLanes*this.roadLen*densInitPerLane);

    for(var i=0; i<nveh; i++){

        // position trucks mainly on the right lane nLanes-1

	var u=(nveh-i-1)*this.roadLen/(nveh); //!!(nveh+1)
	var lane=i%this.nLanes; // left: 0; right: nLanes-1
	var fracTruckRight=Math.min(this.nLanes*fracTruck,1);
	var fracTruckRest=(this.nLanes*fracTruck>1)
	    ? ((this.nLanes*fracTruck-1)/(this.nLanes-1)) : 0;
	var fracTruck=(lane===this.nLanes-1) ? fracTruckRight : fracTruckRest;
	var vehType=(Math.random()<fracTruck) ? "truck" : "car";
	var vehLength=(vehType === "car") ? car_length:truck_length;
	var vehWidth=(vehType === "car") ? car_width:truck_width;

        // actually construct vehicles (this also defined id)

	this.veh[i]=new vehicle(vehLength, vehWidth,u,lane, 
				0.8*speedInit,vehType); // IC

    }
*/

    // formally define ego vehicle for external reference
    // if applicable, it will be attributed to one element of this.veh, 
    // in this.updateEgoVeh(externalEgoVeh), later on.


  this.egoVeh=new vehicle(0,0,0,0,0,"car");

    //########################################################
    // (jun17) transform functions traj_x, traj_y into tables 
    // to allow manipulation
    // !!! (oct18) non-controllable obscure side effects 
    // when using external traj for drawing 
    // (roundabout scenario, this.drawVehiclesGenTraj)
    // => doGridding=false
    // NICE: just set doGridding=false deactivates distorting trajectories 
    // but does not produce any errors!
    //########################################################

  this.traj_x=traj_x; // will be redefined if doGridding
  this.traj_y=traj_y;

  this.xtab=[];
  this.ytab=[];
  this.xtabOld=[]; // tables before begin of user-change action
  this.ytabOld=[];

    //initializes tables tab_x, tab_y, 
    // defines this.traj_x, this.traj_y = basis of this.get_phi 
    //  and then re-samples them (the error by resampling is OK 
    // since initialization with smooth curves)

  if(this.doGridding){

        this.gridTrajectories(traj_x,traj_y); 
        this.update_nSegm_tabxy();


        // defines the variables for user-driven change in road geometry

        this.iPivot=0; // index of nearest element of a user mouse/touchdown
                   // event in {0, ..., nSegm}
        this.xPivot=0; // x coordinate of this event
        this.yPivot=0; // y coordinate of this event

    // helper array: normalized shift kernel, icKernel=center index of kernel
    // kernel width this.icKernel set at beginning, 
    // not changed with regridding!

    //!! eff kernel smaller if high pow in cos-definition of kernel
    // (this.createKernel)

        this.kernelWidth=0.20*this.roadLen;  
        this.icKernel=Math.round(this.nSegm*this.kernelWidth/this.roadLen); 
        this.nKernel=2*this.icKernel+1; // uneven number

        this.kernel=[];
        this.createKernel();
  }
    // end transform functions kin road.cstr

}