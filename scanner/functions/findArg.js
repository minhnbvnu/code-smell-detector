function findArg(fun,val,umin,umax){
  var n=1000.;
  var dist=1e10;
  var ustar=umin;
  for(var i=0; i<=n; i++){
    var u=umin+i/n*(umax-umin);
    var d=Math.abs(fun(u)-val);
    if (d<dist){
      ustar=u;
      dist=d;
    }
  }
  return[ustar,dist];
}