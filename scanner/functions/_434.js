function _434(_45c,_45d,_45e){
var t=$(_45d);
if(t.hasClass("menu-item")){
var opts=t.data("menuitem").options;
opts.disabled=_45e;
if(_45e){
t.addClass("menu-item-disabled");
t[0].onclick=null;
}else{
t.removeClass("menu-item-disabled");
t[0].onclick=opts.onclick;
}
}
}