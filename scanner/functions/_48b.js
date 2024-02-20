function _48b(_48c,_48d){
$(_48c).find(".sidemenu-tree").each(function(){
_48d($(this));
});
$(_48c).find(".tooltip-f").each(function(){
var tip=$(this).tooltip("tip");
if(tip){
tip.find(".sidemenu-tree").each(function(){
_48d($(this));
});
$(this).tooltip("reposition");
}
});
}