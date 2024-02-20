function getRoute(routes, routesFrac){
  var rnd=Math.random();
  var routeIndex=0;
  var fracSum=routesFrac[0];
  while((rnd>fracSum)&&(routeIndex<routesFrac.length-1)){
    fracSum+=routesFrac[routeIndex];
    routeIndex++;
  }
  //console.log("getRoute: route=",routes[routeIndex]);
  return routes[routeIndex];
}