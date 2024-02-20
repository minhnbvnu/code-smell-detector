function _37c(_37d,_37e){
var _37f=$.data(_37d,"tabs");
var opts=_37f.options;
var tabs=_37f.tabs;
var _380=_37f.selectHis;
if(!_381(_37d,_37e)){
return;
}
var tab=_382(_37d,_37e);
var _383=tab.panel("options").title;
var _384=_36e(_37d,tab);
if(opts.onBeforeClose.call(_37d,_383,_384)==false){
return;
}
var tab=_382(_37d,_37e,true);
tab.panel("options").tab.remove();
tab.panel("destroy");
opts.onClose.call(_37d,_383,_384);
_341(_37d);
var his=[];
for(var i=0;i<_380.length;i++){
var _385=_380[i];
if(_385!=_384){
his.push(_385>_384?_385-1:_385);
}
}
_37f.selectHis=his;
var _386=$(_37d).tabs("getSelected");
if(!_386&&his.length){
_384=_37f.selectHis.pop();
$(_37d).tabs("select",_384);
}
}