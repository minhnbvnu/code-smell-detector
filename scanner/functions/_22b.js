function _22b(_22c){
$(_22c).addClass("panel-body")._size("clear");
var _22d=$("<div class=\"panel\"></div>").insertBefore(_22c);
_22d[0].appendChild(_22c);
_22d.bind("_resize",function(e,_22e){
if($(this).hasClass("easyui-fluid")||_22e){
_215(_22c,{});
}
return false;
});
return _22d;
}