function _cca(_ccd,_cce){
var _ccf=$.data(_ccd,"slider");
var opts=_ccf.options;
var _cd0=_ccf.slider;
var size=opts.mode=="h"?_cd0.width():_cd0.height();
var pos=opts.converter.toPosition.call(_ccd,_cce,size);
if(opts.mode=="v"){
pos=_cd0.height()-pos;
}
if(opts.reversed){
pos=size-pos;
}
return pos;
}