function _40e(_40f,_410,_411){
var p=$(_40f).layout("panel",_410);
p.panel("options").split=_411;
var cls="layout-split-"+_410;
var _412=p.panel("panel").removeClass(cls);
if(_411){
_412.addClass(cls);
}
_412.resizable({disabled:(!_411)});
_3bf(_40f);
}