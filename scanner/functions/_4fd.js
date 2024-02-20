function _4fd(_4fe){
var _4ff=$.data(_4fe,"radiobutton");
var opts=_4ff.options;
var _500=_4ff.radiobutton;
_500._size(opts,_500.parent());
if(opts.label&&opts.labelPosition){
if(opts.labelPosition=="top"){
_4ff.label._size({width:opts.labelWidth},_500);
}else{
_4ff.label._size({width:opts.labelWidth,height:_500.outerHeight()},_500);
_4ff.label.css("lineHeight",_500.outerHeight()+"px");
}
}
}