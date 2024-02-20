function _61e(){
if(_61a.menu){
var item=_61a.menu.children("div.menu-item:first");
_61a.menu.children("div.menu-item").each(function(){
var _622=$.extend({},$.parser.parseOptions(this),{selected:($(this).attr("selected")?true:undefined)});
if(_622.selected){
item=$(this);
return false;
}
});
return _61a.menu.menu("getItem",item[0]);
}else{
return null;
}
}