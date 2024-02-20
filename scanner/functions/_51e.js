function _51e(_51f){
var _520=$.data(_51f,"checkbox");
var opts=_520.options;
var _521=_520.checkbox;
_521._size(opts,_521.parent());
if(opts.label&&opts.labelPosition){
if(opts.labelPosition=="top"){
_520.label._size({width:opts.labelWidth},_521);
}else{
_520.label._size({width:opts.labelWidth,height:_521.outerHeight()},_521);
_520.label.css("lineHeight",_521.outerHeight()+"px");
}
}
}