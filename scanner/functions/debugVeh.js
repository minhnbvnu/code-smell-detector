function debugVeh(id){
  for(var ir=0; ir<network.length; ir++){
    for(var i=0; i<network[ir].veh.length; i++){
      if(network[ir].veh[i].id==id){
	  var veh=network[ir].veh[i];
        console.log("time=",time.toFixed(2), "itime=",itime,
		      "status of veh id=",veh.id,
		      " u=",veh.u.toFixed(1),
		    " lane=",veh.lane," v=",veh.v.toFixed(2),
		    " speed=",veh.speed.toFixed(1),
		    " acc=",veh.acc.toFixed(1),
		     // " Fz=",veh,
		     "");
	}
    }
  }
}