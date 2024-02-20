function _28d(_28e,_28f){
var opts=$.data(_28e,"window").options;
var pp=$(_28e).window("panel");
var _290=pp._outerHeight();
if(opts.inline){
var _291=pp.parent();
opts.top=Math.ceil((_291.height()-_290)/2+_291.scrollTop());
}else{
opts.top=Math.ceil(($(window)._outerHeight()-_290)/2+$(document).scrollTop());
}
if(_28f){
_284(_28e);
}
}