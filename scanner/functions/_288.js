function _288(_289,_28a){
var opts=$.data(_289,"window").options;
var pp=$(_289).window("panel");
var _28b=pp._outerWidth();
if(opts.inline){
var _28c=pp.parent();
opts.left=Math.ceil((_28c.width()-_28b)/2+_28c.scrollLeft());
}else{
opts.left=Math.ceil(($(window)._outerWidth()-_28b)/2+$(document).scrollLeft());
}
if(_28a){
_284(_289);
}
}