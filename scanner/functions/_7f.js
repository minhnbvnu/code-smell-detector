function _7f(e){
$.fn.resizable.isResizing=false;
_76(e,true);
_7b(e);
$.data(e.data.target,"resizable").options.onStopResize.call(e.data.target,e);
$(document).unbind(".resizable");
$("body").css("cursor","");
return false;
}