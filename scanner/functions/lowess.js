function lowess(x,y,alpha,inc){var r=[];for(var i=0;i<x.length;i+=1){r.push(1)}
var _l=_calculate_lowess_fit(x,y,alpha,inc,r);}