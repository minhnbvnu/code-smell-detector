function _3fe(_3ff,_400){
var _401=$.data(_3ff,"layout").panels;
var p=_401[_400];
var _402=p.panel("options");
if(_402.onBeforeExpand.call(p)==false){
return;
}
var _403="expand"+_400.substring(0,1).toUpperCase()+_400.substring(1);
if(_401[_403]){
_401[_403].panel("close");
p.panel("panel").stop(true,true);
p.panel("expand",false).panel("open");
var _404=_405();
p.panel("resize",_404.collapse);
p.panel("panel").animate(_404.expand,function(){
_3bf(_3ff);
$(_3ff).layout("options").onExpand.call(_3ff,_400);
});
}
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
};
}