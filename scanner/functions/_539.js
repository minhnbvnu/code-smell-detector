function _539(e){
var _53a=e.data.target;
var _53b=$.data(_53a,"validatebox");
var opts=_53b.options;
if($(_53a).attr("readonly")){
return;
}
_53b.validating=true;
_53b.value=opts.val(_53a);
(function(){
if(!$(_53a).is(":visible")){
_53b.validating=false;
}
if(_53b.validating){
var _53c=opts.val(_53a);
if(_53b.value!=_53c){
_53b.value=_53c;
if(_53b.vtimer){
clearTimeout(_53b.vtimer);
}
_53b.vtimer=setTimeout(function(){
$(_53a).validatebox("validate");
},opts.delay);
}else{
if(_53b.message){
opts.err(_53a,_53b.message);
}
}
_53b.ftimer=setTimeout(arguments.callee,opts.interval);
}
})();
}