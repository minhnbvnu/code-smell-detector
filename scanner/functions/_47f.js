function _47f(_480,_481){
var opts=$(_480).sidemenu("options");
if(_481){
$.extend(opts,{width:_481.width,height:_481.height});
}
$(_480)._size(opts);
$(_480).find(".accordion").accordion("resize");
}