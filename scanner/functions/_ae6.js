function _ae6(e){
var _ae7=e.data.target;
var t=$(_ae7);
var _ae8=t.data("combo");
var opts=t.combo("options");
_ae8.panel.panel("options").comboTarget=_ae7;
switch(e.keyCode){
case 38:
opts.keyHandler.up.call(_ae7,e);
break;
case 40:
opts.keyHandler.down.call(_ae7,e);
break;
case 37:
opts.keyHandler.left.call(_ae7,e);
break;
case 39:
opts.keyHandler.right.call(_ae7,e);
break;
case 13:
e.preventDefault();
opts.keyHandler.enter.call(_ae7,e);
return false;
case 9:
case 27:
_ae0(_ae7);
break;
default:
if(opts.editable){
if(_ae8.timer){
clearTimeout(_ae8.timer);
}
_ae8.timer=setTimeout(function(){
var q=t.combo("getText");
if(_ae8.previousText!=q){
_ae8.previousText=q;
t.combo("showPanel");
opts.keyHandler.query.call(_ae7,q,e);
t.combo("validate");
}
},opts.delay);
}
}
}