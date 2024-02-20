function _4d3(_4e2,mode){
var _4e3=$.data(_4e2,"switchbutton");
var opts=_4e3.options;
opts.readonly=mode==undefined?true:mode;
_4e3.switchbutton.removeClass("switchbutton-readonly").addClass(opts.readonly?"switchbutton-readonly":"");
}