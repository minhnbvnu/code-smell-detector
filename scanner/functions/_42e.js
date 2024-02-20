function _42e(_431,div,_432){
var item=$(div);
var _433=$.extend({},$.parser.parseOptions(item[0],["id","name","iconCls","href",{separator:"boolean"}]),{disabled:(item.attr("disabled")?true:undefined),text:$.trim(item.html()),onclick:item[0].onclick},_432||{});
_433.onclick=_433.onclick||_433.handler||null;
item.data("menuitem",{options:_433});
if(_433.separator){
item.addClass("menu-sep");
}
if(!item.hasClass("menu-sep")){
item.addClass("menu-item");
item.empty().append($("<div class=\"menu-text\"></div>").html(_433.text));
if(_433.iconCls){
$("<div class=\"menu-icon\"></div>").addClass(_433.iconCls).appendTo(item);
}
if(_433.id){
item.attr("id",_433.id);
}
if(_433.onclick){
if(typeof _433.onclick=="string"){
item.attr("onclick",_433.onclick);
}else{
item[0].onclick=eval(_433.onclick);
}
}
if(_433.disabled){
_434(_431,item[0],true);
}
if(item[0].submenu){
$("<div class=\"menu-rightarrow\"></div>").appendTo(item);
}
}
}