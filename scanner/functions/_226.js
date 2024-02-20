function _226(_227,_228){
var _229=$.data(_227,"panel");
var opts=_229.options;
var _22a=_229.panel;
if(_228){
if(_228.left!=null){
opts.left=_228.left;
}
if(_228.top!=null){
opts.top=_228.top;
}
}
_22a.css({left:opts.left,top:opts.top});
_22a.find(".tooltip-f").each(function(){
$(this).tooltip("reposition");
});
opts.onMove.apply(_227,[opts.left,opts.top]);
}