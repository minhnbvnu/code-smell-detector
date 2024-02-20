function trajFromSpec_x(u,trajP){
  
  var iSegm=0;
  while((u>trajP.u[iSegm+1])&&(iSegm+1<trajP.xCenter.length)){iSegm++;} 

  var curv=(trajP.phi[iSegm+1]-trajP.phi[iSegm])
    /(trajP.u[iSegm+1]-trajP.u[iSegm]);
  var straightSegm=(Math.abs(curv)<1e-6);
  var r=(straightSegm) ? 1e6 : 1./curv; // with sign

  var x=(straightSegm)
      ? trajP.x[iSegm] + (u-trajP.u[iSegm])*Math.cos(trajP.phi[iSegm])
      : trajP.xCenter[iSegm]
      + r*Math.sin(trajP.phi[iSegm]+curv*(u-trajP.u[iSegm]));

  return x;
}