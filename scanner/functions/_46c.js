function _46c(_46d){
$(_46d).children("div.menu-item").each(function(){
_463(_46d,this);
});
if(_46d.shadow){
_46d.shadow.remove();
}
$(_46d).remove();
}