function _af3(){
if(opts.panelValign=="top"){
var top=_aef.offset().top-_af0._outerHeight();
}else{
if(opts.panelValign=="bottom"){
var top=_aef.offset().top+_aef._outerHeight();
}else{
var top=_aef.offset().top+_aef._outerHeight();
if(top+_af0._outerHeight()>$(window)._outerHeight()+$(document).scrollTop()){
top=_aef.offset().top-_af0._outerHeight();
}
if(top<$(document).scrollTop()){
top=_aef.offset().top+_aef._outerHeight();
}
}
}
return top;
}