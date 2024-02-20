function _458(_459,_45a){
var _45b=null;
var fn=$.isFunction(_45a)?_45a:function(item){
for(var p in _45a){
if(item[p]!=_45a[p]){
return false;
}
}
return true;
};
function find(menu){
menu.children("div.menu-item").each(function(){
var opts=$(this).data("menuitem").options;
if(fn.call(_459,opts)==true){
_45b=$(_459).menu("getItem",this);
}else{
if(this.submenu&&!_45b){
find(this.submenu);
}
}
});
};
find($(_459));
return _45b;
}