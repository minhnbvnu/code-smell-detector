function _24c(_24d,_24e){
var _24f=$.data(_24d,"panel");
var opts=_24f.options;
var _250=_24f.panel;
if(_24e!=true){
if(opts.onBeforeClose.call(_24d)==false){
return;
}
}
_250.find(".tooltip-f").each(function(){
$(this).tooltip("hide");
});
_250.stop(true,true);
_250._size("unfit");
if($.isFunction(opts.closeAnimation)){
opts.closeAnimation.call(_24d,cb);
}else{
switch(opts.closeAnimation){
case "slide":
_250.slideUp(opts.closeDuration,cb);
break;
case "fade":
_250.fadeOut(opts.closeDuration,cb);
break;
case "hide":
_250.hide(opts.closeDuration,cb);
break;
default:
_250.hide();
cb();
}
}
function cb(){
opts.closed=true;
opts.onClose.call(_24d);
};
}