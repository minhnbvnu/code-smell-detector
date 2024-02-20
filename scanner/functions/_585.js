function _585(_589){
var w=0;
btn.filter(".textbox-button-"+_589).each(function(){
if(_589=="left"||_589=="right"){
w+=$(this).outerWidth();
}else{
w+=$(this).outerHeight();
}
});
return w;
}