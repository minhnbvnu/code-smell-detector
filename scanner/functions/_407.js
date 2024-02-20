function _407(_408){
var _409=$.data(_408,"layout");
var opts=_409.options;
var _40a=_409.panels;
var _40b=opts.onCollapse;
opts.onCollapse=function(){
};
_40c("east");
_40c("west");
_40c("north");
_40c("south");
opts.onCollapse=_40b;
function _40c(_40d){
var p=_40a[_40d];
if(p.length&&p.panel("options").collapsed){
_3eb(_408,_40d,0);
}
};
}