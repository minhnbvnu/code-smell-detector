function _42c(_42d,div){
var menu=$(div).addClass("menu");
if(!menu.data("menu")){
menu.data("menu",{options:$.parser.parseOptions(menu[0],["width","height"])});
}
if(!menu.hasClass("menu-content")){
menu.children("div").each(function(){
_42e(_42d,this);
});
$("<div class=\"menu-line\"></div>").prependTo(menu);
}
_42f(_42d,menu);
if(!menu.hasClass("menu-inline")){
menu.hide();
}
_430(_42d,menu);
}