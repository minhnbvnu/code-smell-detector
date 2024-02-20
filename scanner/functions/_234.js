function _234(){
if(opts.footer){
$(opts.footer).addClass("panel-footer").appendTo(_232);
$(_230).addClass("panel-body-nobottom");
}else{
_232.children(".panel-footer").remove();
$(_230).removeClass("panel-body-nobottom");
}
}