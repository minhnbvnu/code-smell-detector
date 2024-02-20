function _263(_264){
var opts=$.data(_264,"panel").options;
var _265=$.data(_264,"panel").panel;
var tool=_265.children(".panel-header").find("a.panel-tool-max");
if(opts.maximized==false){
return;
}
_265.show();
tool.removeClass("panel-tool-restore");
$.extend(opts,$.data(_264,"panel").original);
_215(_264);
opts.minimized=false;
opts.maximized=false;
$.data(_264,"panel").original=null;
opts.onRestore.call(_264);
}