function _726(cc){
var _729=0;
var _72a=0;
$(cc).children().each(function(){
var c=$(this);
if(c.is(":visible")){
_72a+=c._outerHeight();
if(_729<c._outerWidth()){
_729=c._outerWidth();
}
}
});
return {width:_729,height:_72a};
}