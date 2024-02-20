function _3bf(_3c0,_3c1){
var _3c2=$.data(_3c0,"layout");
var opts=_3c2.options;
var _3c3=_3c2.panels;
var cc=$(_3c0);
if(_3c1){
$.extend(opts,{width:_3c1.width,height:_3c1.height});
}
if(_3c0.tagName.toLowerCase()=="body"){
cc._size("fit");
}else{
cc._size(opts);
}
var cpos={top:0,left:0,width:cc.width(),height:cc.height()};
_3c4(_3c5(_3c3.expandNorth)?_3c3.expandNorth:_3c3.north,"n");
_3c4(_3c5(_3c3.expandSouth)?_3c3.expandSouth:_3c3.south,"s");
_3c6(_3c5(_3c3.expandEast)?_3c3.expandEast:_3c3.east,"e");
_3c6(_3c5(_3c3.expandWest)?_3c3.expandWest:_3c3.west,"w");
_3c3.center.panel("resize",cpos);
function _3c4(pp,type){
if(!pp.length||!_3c5(pp)){
return;
}
var opts=pp.panel("options");
pp.panel("resize",{width:cc.width(),height:opts.height});
var _3c7=pp.panel("panel").outerHeight();
pp.panel("move",{left:0,top:(type=="n"?0:cc.height()-_3c7)});
cpos.height-=_3c7;
if(type=="n"){
cpos.top+=_3c7;
if(!opts.split&&opts.border){
cpos.top--;
}
}
if(!opts.split&&opts.border){
cpos.height++;
}
};
function _3c6(pp,type){
if(!pp.length||!_3c5(pp)){
return;
}
var opts=pp.panel("options");
pp.panel("resize",{width:opts.width,height:cpos.height});
var _3c8=pp.panel("panel").outerWidth();
pp.panel("move",{left:(type=="e"?cc.width()-_3c8:0),top:cpos.top});
cpos.width-=_3c8;
if(type=="w"){
cpos.left+=_3c8;
if(!opts.split&&opts.border){
cpos.left--;
}
}
if(!opts.split&&opts.border){
cpos.width++;
}
};
}