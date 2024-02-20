function _af2(){
var left=_aef.offset().left;
if(opts.panelAlign=="right"){
left+=_aef._outerWidth()-_af0._outerWidth();
}
if(left+_af0._outerWidth()>$(window)._outerWidth()+$(document).scrollLeft()){
left=$(window)._outerWidth()+$(document).scrollLeft()-_af0._outerWidth();
}
if(left<0){
left=0;
}
return left;
}