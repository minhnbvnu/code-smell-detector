function _36f(_370,_371){
var _372=$.data(_370,"tabs");
var opts=_372.options;
if(_371.selected==undefined){
_371.selected=true;
}
_362(_370,_371);
opts.onAdd.call(_370,_371.title,_371.index);
if(_371.selected){
_373(_370,_371.index);
}
}