function _54b(_54c){
var _54d=$.data(_54c,"validatebox");
var opts=_54d.options;
var box=$(_54c);
opts.onBeforeValidate.call(_54c);
var _54e=_54f();
_54e?box.removeClass("validatebox-invalid"):box.addClass("validatebox-invalid");
opts.err(_54c,_54d.message);
opts.onValidate.call(_54c,_54e);
return _54e;
function _550(msg){
_54d.message=msg;
};
function _551(_552,_553){
var _554=opts.val(_54c);
var _555=/([a-zA-Z_]+)(.*)/.exec(_552);
var rule=opts.rules[_555[1]];
if(rule&&_554){
var _556=_553||opts.validParams||eval(_555[2]);
if(!rule["validator"].call(_54c,_554,_556)){
var _557=rule["message"];
if(_556){
for(var i=0;i<_556.length;i++){
_557=_557.replace(new RegExp("\\{"+i+"\\}","g"),_556[i]);
}
}
_550(opts.invalidMessage||_557);
return false;
}
}
return true;
};
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
};
}