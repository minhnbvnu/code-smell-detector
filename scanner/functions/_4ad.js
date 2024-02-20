function _4ad(_4ae){
var opts=$.data(_4ae,"menubutton").options;
var btn=$(_4ae);
var t=btn.find("."+opts.cls.trigger);
if(!t.length){
t=btn;
}
t.unbind(".menubutton");
var _4af=null;
t.bind(opts.showEvent+".menubutton",function(){
if(!_4b0()){
_4af=setTimeout(function(){
_4b1(_4ae);
},opts.duration);
return false;
}
}).bind(opts.hideEvent+".menubutton",function(){
if(_4af){
clearTimeout(_4af);
}
$(opts.menu).triggerHandler("mouseleave");
});
function _4b0(){
return $(_4ae).linkbutton("options").disabled;
};
}