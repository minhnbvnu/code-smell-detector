function _463(_464,_465){
function _466(el){
if(el.submenu){
el.submenu.children("div.menu-item").each(function(){
_466(this);
});
var _467=el.submenu[0].shadow;
if(_467){
_467.remove();
}
el.submenu.remove();
}
$(el).remove();
};
_466(_465);
}