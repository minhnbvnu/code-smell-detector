function _54f(){
_550("");
if(!opts._validateOnCreate){
setTimeout(function(){
opts._validateOnCreate=true;
},0);
return true;
}
if(opts.novalidate||opts.disabled){
return true;
}
if(opts.required){
if(opts.val(_54c)==""){
_550(opts.missingMessage);
return false;
}
}
if(opts.validType){
if($.isArray(opts.validType)){
for(var i=0;i<opts.validType.length;i++){
if(!_551(opts.validType[i])){
return false;
}
}
}else{
if(typeof opts.validType=="string"){
if(!_551(opts.validType)){
return false;
}
}else{
for(var _558 in opts.validType){
var _559=opts.validType[_558];
if(!_551(_558,_559)){
return false;
}
}
}
}
}
return true;
}