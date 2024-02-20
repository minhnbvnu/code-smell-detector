function _44b(e){
var _44c=e.data.target;
var item=$(e.target).closest(".menu-item");
if(item.length){
var opts=$(_44c).data("menu").options;
var _44d=item.data("menuitem").options;
if(_44d.disabled){
return;
}
if(!item[0].submenu){
_445(_44c,opts.inline);
if(_44d.href){
location.href=_44d.href;
}
}
item.trigger("mouseenter");
opts.onClick.call(_44c,$(_44c).menu("getItem",item[0]));
}
}