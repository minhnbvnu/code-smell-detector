function lowess_robust(x,y,alpha,inc){var _l;var r=[];var yhat=d3.mean(y);for(var i=0;i<x.length;i+=1){r.push(1)};_l=_calculate_lowess_fit(x,y,alpha,inc,r);var x_proto=_l.x;var y_proto=_l.y;for(var i=0;i<100;i+=1){r=d3.zip(y_proto,y).map(function(yi){return Math.abs(yi[1]-yi[0])})
var q=d3.quantile(r.sort(),.5)
r=r.map(function(ri){return _bisquare_weight(ri/(6*q))})
_l=_calculate_lowess_fit(x,y,alpha,inc,r);x_proto=_l.x;y_proto=_l.y;}
return d3.zip(x_proto,y_proto).map(function(d){var p={};p.x=d[0];p.y=d[1];return p;});}