function _2b6(_2b7,_2b8){
var t=$(_2b7);
var opts=t.dialog("options");
var _2b9=opts.noheader;
var tb=t.siblings(".dialog-toolbar");
var bb=t.siblings(".dialog-button");
tb.insertBefore(_2b7).css({borderTopWidth:(_2b9?1:0),top:(_2b9?tb.length:0)});
bb.insertAfter(_2b7);
tb.add(bb)._outerWidth(t._outerWidth()).find(".easyui-fluid:visible").each(function(){
$(this).triggerHandler("_resize");
});
var _2ba=tb._outerHeight()+bb._outerHeight();
if(!isNaN(parseInt(opts.height))){
t._outerHeight(t._outerHeight()-_2ba);
}else{
var _2bb=t._size("min-height");
if(_2bb){
t._size("min-height",_2bb-_2ba);
}
var _2bc=t._size("max-height");
if(_2bc){
t._size("max-height",_2bc-_2ba);
}
}
var _2bd=$.data(_2b7,"window").shadow;
if(_2bd){
var cc=t.panel("panel");
_2bd.css({width:cc._outerWidth(),height:cc._outerHeight()});
}
}