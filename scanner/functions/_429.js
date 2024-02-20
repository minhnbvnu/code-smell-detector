function _429(menu){
var _42a=[];
menu.addClass("menu");
_42a.push(menu);
if(!menu.hasClass("menu-content")){
menu.children("div").each(function(){
var _42b=$(this).children("div");
if(_42b.length){
_42b.appendTo("body");
this.submenu=_42b;
var mm=_429(_42b);
_42a=_42a.concat(mm);
}
});
}
return _42a;
}