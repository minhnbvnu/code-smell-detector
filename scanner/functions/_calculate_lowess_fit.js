function _calculate_lowess_fit(x,y,alpha,inc,residuals){var k=Math.floor(x.length*alpha);var sorted_x=x.slice();sorted_x.sort(function(a,b){if(a<b){return-1}
else if(a>b){return 1}
return 0});var x_max=d3.quantile(sorted_x,.98);var x_min=d3.quantile(sorted_x,.02);var xy=d3.zip(x,y,residuals).sort();var size=Math.abs(x_max-x_min)/inc;var smallest=x_min
var largest=x_max
var x_proto=d3.range(smallest,largest,size);var xi_neighbors;var x_i,beta_i,x0_i,delta_i,xbar,ybar;var y_proto=[];for(var i=0;i<x_proto.length;i+=1){x_i=x_proto[i]
xi_neighbors=xy.map(function(xyi){return[Math.abs(xyi[0]-x_i),xyi[0],xyi[1],xyi[2]]}).sort().slice(0,k)
delta_i=d3.max(xi_neighbors)[0]
xi_neighbors=xi_neighbors.map(function(wxy){return{w:_tricube_weight(wxy[0]/delta_i)*wxy[3],x:wxy[1],y:wxy[2]}})
var _output=_weighted_least_squares(xi_neighbors)
x0_i=_output.x0;beta_i=_output.beta;y_proto.push(x0_i+beta_i*x_i)}
return{x:x_proto,y:y_proto};}