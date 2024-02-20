function _260(_261){
var opts=$.data(_261,"panel").options;
var _262=$.data(_261,"panel").panel;
_262._size("unfit");
_262.hide();
opts.minimized=true;
opts.maximized=false;
opts.onMinimize.call(_261);
}