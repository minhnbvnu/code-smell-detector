function _332(c){
var w=0;
$(c).children().each(function(){
w+=$(this).outerWidth(true);
});
return w;
}