function _245(_246,_247){
var _248=$.data(_246,"panel");
var opts=_248.options;
var _249=_248.panel;
if(_247!=true){
if(opts.onBeforeOpen.call(_246)==false){
return;
}
}
_249.stop(true,true);
if($.isFunction(opts.openAnimation)){
opts.openAnimation.call(_246,cb);
}else{
switch(opts.openAnimation){
case "slide":
_249.slideDown(opts.openDuration,cb);
break;
case "fade":
_249.fadeIn(opts.openDuration,cb);
break;
case "show":
_249.show(opts.openDuration,cb);
break;
default:
_249.show();
cb();
}
}
function cb(){
opts.closed=false;
opts.minimized=false;
var tool=_249.children(".panel-header").find("a.panel-tool-restore");
if(tool.length){
opts.maximized=true;
}
opts.onOpen.call(_246);
if(opts.maximized==true){
opts.maximized=false;
_24a(_246);
}
if(opts.collapsed==true){
opts.collapsed=false;
_24b(_246);
}
if(!opts.collapsed){
if(opts.href&&(!_248.isLoaded||!opts.cache)){
_23b(_246);
_243(_246);
opts.doneLayout=true;
}
}
if(!opts.doneLayout){
opts.doneLayout=true;
_243(_246);
}
};
}