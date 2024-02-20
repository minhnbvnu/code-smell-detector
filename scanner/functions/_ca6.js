function _ca6(_ca7,_ca8){
var _ca9=$.data(_ca7,"slider");
var opts=_ca9.options;
var _caa=_ca9.slider;
if(_ca8){
if(_ca8.width){
opts.width=_ca8.width;
}
if(_ca8.height){
opts.height=_ca8.height;
}
}
_caa._size(opts);
if(opts.mode=="h"){
_caa.css("height","");
_caa.children("div").css("height","");
}else{
_caa.css("width","");
_caa.children("div").css("width","");
_caa.children("div.slider-rule,div.slider-rulelabel,div.slider-inner")._outerHeight(_caa._outerHeight());
}
_cab(_ca7);
}