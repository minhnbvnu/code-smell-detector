function stationaryDetector(road,u,dtAggr){
    //console.log("in stationaryDetector cstr: road=",road);
  this.road=road;
  this.u=u;
  this.dtAggr=dtAggr;
  this.exportString=""; // for export to file

    if(this.u>road.roadLen){
	console.log("Warning: trying to place a detector at position u=",
		    this.u," greater than the road segment length ",
		    road.roadLen," resetting u=",road.roadLen);
	this.u=road.roadLen;
    }

    // initializing macroscopic records

    this.iAggr=0;
    this.historyFlow=[];
    this.historySpeed=[];
    this.historyFlow[0]=0;
    this.historySpeed[0]=0;
    this.vehCount=0; // counting inside each aggregation interval (all lanes)
    this.speedSum=0; // summing inside each aggregation interval
    this.nLanes=this.road.nLanes;
    this.vehNearOld=(this.u<0.5*this.road.roadLen) 
	? this.road.findLeaderAt(this.u) : this.road.findFollowerAt(this.u);
}