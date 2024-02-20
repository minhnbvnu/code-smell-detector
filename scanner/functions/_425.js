function _425(menu){
if(menu&&menu.length){
_457(menu);
menu.find("div.menu-item").each(function(){
if(this.submenu){
_425(this.submenu);
}
$(this).removeClass("menu-active");
});
}
function _457(m){
m.stop(true,true);
if(m[0].shadow){
m[0].shadow.hide();
}
m.hide();
};
}