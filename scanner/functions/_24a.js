function _24a(_25e){
var opts=$.data(_25e,"panel").options;
var _25f=$.data(_25e,"panel").panel;
var tool=_25f.children(".panel-header").find("a.panel-tool-max");
if(opts.maximized==true){
return;
}
tool.addClass("panel-tool-restore");
if(!$.data(_25e,"panel").original){
$.data(_25e,"panel").original={width:opts.width,height:opts.height,left:opts.left,top:opts.top,fit:opts.fit};
}
opts.left=0;
opts.top=0;
opts.fit=true;
_215(_25e);
opts.minimized=false;
opts.maximized=true;
opts.onMaximize.call(_25e);
}