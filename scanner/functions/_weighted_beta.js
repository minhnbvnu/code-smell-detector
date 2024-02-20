function _weighted_beta(wxy,xbar,ybar){var num=d3.sum(wxy.map(function(wxyi){return Math.pow(wxyi.w,2)*(wxyi.x-xbar)*(wxyi.y-ybar)}))
var denom=d3.sum(wxy.map(function(wxyi){return Math.pow(wxyi.w,2)*(Math.pow(wxyi.x-xbar),2)}))
return num/denom;}