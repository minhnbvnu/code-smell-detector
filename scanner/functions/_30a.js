function _30a(_30b){
var opts=$.data(_30b,"accordion").options;
$(_30b).find(">.panel-last>.accordion-header").addClass("accordion-header-border");
var p=_2e5(_30b,"selected",true);
if(p){
_30c(_2ee(_30b,p));
}else{
_30c(opts.selected);
}
function _30c(_30d){
var _30e=opts.animate;
opts.animate=false;
_303(_30b,_30d);
opts.animate=_30e;
};
}