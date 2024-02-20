function _405(){
var cc=$(_3ff);
var _406=_401.center.panel("options");
if(_400=="east"&&_401.expandEast){
return {collapse:{left:cc.width(),top:_406.top,height:_406.height},expand:{left:cc.width()-p.panel("panel")._outerWidth()}};
}else{
if(_400=="west"&&_401.expandWest){
return {collapse:{left:-p.panel("panel")._outerWidth(),top:_406.top,height:_406.height},expand:{left:0}};
}else{
if(_400=="north"&&_401.expandNorth){
return {collapse:{top:-p.panel("panel")._outerHeight(),width:cc.width()},expand:{top:0}};
}else{
if(_400=="south"&&_401.expandSouth){
return {collapse:{top:cc.height(),width:cc.width()},expand:{top:cc.height()-p.panel("panel")._outerHeight()}};
}
}
}
}
}