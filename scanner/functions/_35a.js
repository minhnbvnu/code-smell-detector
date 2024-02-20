function _35a(li){
var _35d=0;
li.parent().children("li").each(function(i){
if(li[0]==this){
_35d=i;
return false;
}
});
return _35d;
}