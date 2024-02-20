function _315(_316,_317){
var _318=$.data(_316,"accordion");
var opts=_318.options;
var _319=_318.panels;
_307(_316);
var _31a=_2f1(_316,_317);
var _31b=_31a.panel("options").title;
var _31c=_2ee(_316,_31a);
if(!_31a){
return;
}
if(opts.onBeforeRemove.call(_316,_31b,_31c)==false){
return;
}
_319.splice(_31c,1);
_31a.panel("destroy");
if(_319.length){
_2d7(_316);
var curr=_2ec(_316);
if(!curr){
_303(_316,0);
}
}
opts.onRemove.call(_316,_31b,_31c);
}