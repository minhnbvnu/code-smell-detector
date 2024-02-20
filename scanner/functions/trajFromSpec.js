function trajFromSpec(u,trajP){
  
  // find segment iSegm
  // circle centers xc,yc have as many elements as du and curv from input
  // xp,yp,up,phip one more => take xc or yc as array upper bound
  
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
  var y=(straightSegm)
      ? trajP.y[iSegm] + (u-trajP.u[iSegm])*Math.sin(trajP.phi[iSegm])
      : trajP.yCenter[iSegm]
      - r*Math.cos(trajP.phi[iSegm]+curv*(u-trajP.u[iSegm]));

  return [x,y];
}