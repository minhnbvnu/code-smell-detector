function _cbe(_cd1,pos){
var _cd2=$.data(_cd1,"slider");
var opts=_cd2.options;
var _cd3=_cd2.slider;
var size=opts.mode=="h"?_cd3.width():_cd3.height();
var pos=opts.mode=="h"?(opts.reversed?(size-pos):pos):(opts.reversed?pos:(size-pos));
var _cd4=opts.converter.toValue.call(_cd1,pos,size);
return _cd4;
}