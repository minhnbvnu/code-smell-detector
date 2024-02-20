function _b1f(_b20,_b21){
var opts=$.data(_b20,"combobox").options;
var _b22=$(_b20).combo("panel");
var item=opts.finder.getEl(_b20,_b21);
if(item.length){
if(item.position().top<=0){
var h=_b22.scrollTop()+item.position().top;
_b22.scrollTop(h);
}else{
if(item.position().top+item.outerHeight()>_b22.height()){
var h=_b22.scrollTop()+item.position().top+item.outerHeight()-_b22.height();
_b22.scrollTop(h);
}
}
}
_b22.triggerHandler("scroll");
}