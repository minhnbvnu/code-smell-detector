function _449(e){
var item=$(e.target).closest(".menu-item");
if(item.length){
item.removeClass("menu-active menu-active-disabled");
var _44a=item[0].submenu;
if(_44a){
if(e.pageX>=parseInt(_44a.css("left"))){
item.addClass("menu-active");
}else{
_425(_44a);
}
}else{
item.removeClass("menu-active");
}
}
}