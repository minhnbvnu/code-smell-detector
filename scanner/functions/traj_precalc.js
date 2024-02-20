function traj_precalc(x0,y0,phi0,du,curv){

  var debug=false;
  if(debug){
    console.log(
      "in traj_precalc: x0=",x0," y0=",y0," phi0=",phi0,
      "\n  du=",du,
      "\n  curv=",curv);
  }

  
  var up=[]; // arc length at the stitching points (always lower-u end)
  var phip=[];
  var xp=[]; // stitching point coordinates
  var yp=[];
  var xc=[]; // arc circle center between u[i] and u[i+1] 
  var yc=[]; // or infty at last stitching point since du[du.length-1] not used
  
  xp[0]=x0; yp[0]=y0; up[0]=0; phip[0]=phi0;
  
  for (var i=0; i<du.length; i++){
    up[i+1]=up[i]+du[i];
    phip[i+1]=phip[i]+curv[i]*du[i];
    var x=0;
    var straightSegm=(Math.abs(curv[i])<1e-6); // straight segment
    var r=(straightSegm) ? 1e6 : 1./curv[i];
    
    if(straightSegm){
      xp[i+1]=xp[i]+du[i]*Math.cos(phip[i]);
      yp[i+1]=yp[i]+du[i]*Math.sin(phip[i]);
      xc[i]=1e6; // not used
      yc[i]=1e6;
    }

    // arc segment
    
    else{
      xc[i]=xp[i]   - r*Math.sin(phip[i]);
      yc[i]=yp[i]   + r*Math.cos(phip[i]);
      xp[i+1]=xc[i] + r*Math.sin(phip[i+1]);
      yp[i+1]=yc[i] - r*Math.cos(phip[i+1]);
    }

    if(debug){
      console.log("i=",i,
		  " straightSegm=",straightSegm,
		  " r=",r.toFixed(0),
		  " up[i+1]=",up[i+1].toFixed(0),
		  " phip[i+1]=",phip[i+1].toFixed(2),
		  " xp[i+1]=",xp[i+1].toFixed(0),
		  " yp[i+1]=",yp[i+1].toFixed(0),
		  " xc[i]=",xc[i].toFixed(0),
		  " yc[i]=",yc[i].toFixed(0),
		  "");
    }
		  

  }
  
  var trajSpec={u: up, phi: phip, x: xp, y: yp, xCenter: xc, yCenter: yc};
  return trajSpec;
}