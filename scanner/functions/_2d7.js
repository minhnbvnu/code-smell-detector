function _2d7(_2d8,_2d9){
var _2da=$.data(_2d8,"accordion");
var opts=_2da.options;
var _2db=_2da.panels;
var cc=$(_2d8);
var _2dc=(opts.halign=="left"||opts.halign=="right");
cc.children(".panel-last").removeClass("panel-last");
cc.children(".panel:last").addClass("panel-last");
if(_2d9){
$.extend(opts,{width:_2d9.width,height:_2d9.height});
}
cc._size(opts);
var _2dd=0;
var _2de="auto";
var _2df=cc.find(">.panel>.accordion-header");
if(_2df.length){
if(_2dc){
$(_2df[0]).next().panel("resize",{width:cc.width(),height:cc.height()});
_2dd=$(_2df[0])._outerWidth();
}else{
_2dd=$(_2df[0]).css("height","")._outerHeight();
}
}
if(!isNaN(parseInt(opts.height))){
if(_2dc){
_2de=cc.width()-_2dd*_2df.length;
}else{
_2de=cc.height()-_2dd*_2df.length;
}
}
_2e0(true,_2de-_2e0(false));
function _2e0(_2e1,_2e2){
var _2e3=0;
for(var i=0;i<_2db.length;i++){
var p=_2db[i];
if(_2dc){
var h=p.panel("header")._outerWidth(_2dd);
}else{
var h=p.panel("header")._outerHeight(_2dd);
}
if(p.panel("options").collapsible==_2e1){
var _2e4=isNaN(_2e2)?undefined:(_2e2+_2dd*h.length);
if(_2dc){
p.panel("resize",{height:cc.height(),width:(_2e1?_2e4:undefined)});
_2e3+=p.panel("panel")._outerWidth()-_2dd*h.length;
}else{
p.panel("resize",{width:cc.width(),height:(_2e1?_2e4:undefined)});
_2e3+=p.panel("panel").outerHeight()-_2dd*h.length;
}
}
}
return _2e3;
};
}