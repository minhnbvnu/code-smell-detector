function _1f3(_1f4){
var opts=$.data(_1f4,"tooltip").options;
$(_1f4).unbind(".tooltip").bind(opts.showEvent+".tooltip",function(e){
$(_1f4).tooltip("show",e);
}).bind(opts.hideEvent+".tooltip",function(e){
$(_1f4).tooltip("hide",e);
}).bind("mousemove.tooltip",function(e){
if(opts.trackMouse){
opts.trackMouseX=e.pageX;
opts.trackMouseY=e.pageY;
$(_1f4).tooltip("reposition");
}
});
}