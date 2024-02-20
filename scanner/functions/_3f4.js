function _3f4(){
var cc=$(_3ec);
var _3f9=_3ef.center.panel("options");
var _3fa=_3f0.collapsedSize;
if(_3ed=="east"){
var _3fb=p.panel("panel")._outerWidth();
var _3fc=_3f9.width+_3fb-_3fa;
if(_3f0.split||!_3f0.border){
_3fc++;
}
return {resizeC:{width:_3fc},expand:{left:cc.width()-_3fb},expandP:{top:_3f9.top,left:cc.width()-_3fa,width:_3fa,height:_3f9.height},collapse:{left:cc.width(),top:_3f9.top,height:_3f9.height}};
}else{
if(_3ed=="west"){
var _3fb=p.panel("panel")._outerWidth();
var _3fc=_3f9.width+_3fb-_3fa;
if(_3f0.split||!_3f0.border){
_3fc++;
}
return {resizeC:{width:_3fc,left:_3fa-1},expand:{left:0},expandP:{left:0,top:_3f9.top,width:_3fa,height:_3f9.height},collapse:{left:-_3fb,top:_3f9.top,height:_3f9.height}};
}else{
if(_3ed=="north"){
var _3fd=p.panel("panel")._outerHeight();
var hh=_3f9.height;
if(!_3c5(_3ef.expandNorth)){
hh+=_3fd-_3fa+((_3f0.split||!_3f0.border)?1:0);
}
_3ef.east.add(_3ef.west).add(_3ef.expandEast).add(_3ef.expandWest).panel("resize",{top:_3fa-1,height:hh});
return {resizeC:{top:_3fa-1,height:hh},expand:{top:0},expandP:{top:0,left:0,width:cc.width(),height:_3fa},collapse:{top:-_3fd,width:cc.width()}};
}else{
if(_3ed=="south"){
var _3fd=p.panel("panel")._outerHeight();
var hh=_3f9.height;
if(!_3c5(_3ef.expandSouth)){
hh+=_3fd-_3fa+((_3f0.split||!_3f0.border)?1:0);
}
_3ef.east.add(_3ef.west).add(_3ef.expandEast).add(_3ef.expandWest).panel("resize",{height:hh});
return {resizeC:{height:hh},expand:{top:cc.height()-_3fd},expandP:{top:cc.height()-_3fa,left:0,width:cc.width(),height:_3fa},collapse:{top:cc.height(),width:cc.width()}};
}
}
}
}
}