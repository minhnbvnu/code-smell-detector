function checkForCrashes(){
  //console.log("\nCheck for crashes, time=",time.toFixed(2),":");
  for(var ir1=0; ir1<network.length; ir1++){
    var road1=network[ir1];
    for(var i1=0; i1<network[ir1].veh.length; i1++){
      var veh1=network[ir1].veh[i1];
      if(veh1.isRegularVeh()){
	
        var traj1=road1.getTraj(veh1);
	var uc1Phys=veh1.u-0.5*veh1.len;
	var vc1Phys=road1.laneWidth*(veh1.v-0.5*(road1.nLanes-1));
	var phi1=road1.get_phi(uc1Phys,traj1);
	var x1=traj1[0](uc1Phys+ vc1Phys*Math.sin(phi1));
	var y1=traj1[1](uc1Phys- vc1Phys*Math.cos(phi1));
        for(var ir2=0; ir2<network.length; ir2++){
	  var road2=network[ir2];
	  for(var i2=0; i2<network[ir2].veh.length; i2++){
	    var veh2=network[ir2].veh[i2];
	  
	    if((veh2.isRegularVeh())&&(veh1.id<veh2.id)){
	    
              var traj2=road2.getTraj(veh2);
	      uc2Phys=veh2.u-0.5*veh2.len;
	      vc2Phys=road2.laneWidth*(veh2.v-0.5*(road2.nLanes-1));
	      phi2=road2.get_phi(uc2Phys,traj2);
	      var x2=traj2[0](uc2Phys+ vc2Phys*Math.sin(phi2));
	      var y2=traj2[1](uc2Phys- vc2Phys*Math.cos(phi2));
	    

	      var dist2=Math.pow(x1-x2,2)+Math.pow(y1-y2,2);
	      
	      if((dist2<2.25)&&(Math.abs(phi1-phi2)>0.2)){
	      //if((veh1.id==208)&&(veh2.id==209)){
		console.log(" t=",time.toFixed(2),
			    "vehs",veh1.id," and",veh2.id,":",
			   // "uc1Phys=",uc1Phys.toFixed(1),
			   // "uc2Phys=",uc2Phys.toFixed(1),
			    "x1=",x1.toFixed(1),
			    "x2=",x2.toFixed(1),
			    "y1=",y1.toFixed(1),
			    "y2=",y2.toFixed(1),
			    "phi1=",phi1.toFixed(1),
			    "phi2=",phi2.toFixed(1),
			    "dist=",(Math.sqrt(dist2)).toFixed(1),
			   // "road1=",road1.roadID,
			   // "road2=",road2.roadID,
			    //"traj2=",traj2,
			    "");
		alert("crash of vehs "+veh1.id+" and "+veh2.id);
	      }
	    }
	  }
	}
	  
	  
      }
    }
  }
}