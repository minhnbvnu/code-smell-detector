function trajFromSpec_y(u,trajP){
  
  var iSegm=0;
  while((u>trajP.u[iSegm+1])&&(iSegm+1<trajP.xCenter.length)){iSegm++;} 

  var curv=(trajP.phi[iSegm+1]-trajP.phi[iSegm])
    /(trajP.u[iSegm+1]-trajP.u[iSegm]);
  var straightSegm=(Math.abs(curv)<1e-6);
  var r=(straightSegm) ? 1e6 : 1./curv; // with sign

  var y=(straightSegm)
      ? trajP.y[iSegm] + (u-trajP.u[iSegm])*Math.sin(trajP.phi[iSegm])
      : trajP.yCenter[iSegm]
      - r*Math.cos(trajP.phi[iSegm]+curv*(u-trajP.u[iSegm]));

  return y;
}