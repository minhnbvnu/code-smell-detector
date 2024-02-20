function _5d2(e){
var _5d3=e.data.target;
var t=$(e.data.target);
var _5d4=t.data("passwordbox");
var opts=t.data("passwordbox").options;
_5d4.checking=true;
_5d4.value=t.passwordbox("getText");
(function(){
if(_5d4.checking){
var _5d5=t.passwordbox("getText");
if(_5d4.value!=_5d5){
_5d4.value=_5d5;
if(_5d4.lastTimer){
clearTimeout(_5d4.lastTimer);
_5d4.lastTimer=undefined;
}
_5cb(_5d3,_5d5);
_5d4.lastTimer=setTimeout(function(){
_5cb(_5d3,t.passwordbox("getText"),true);
_5d4.lastTimer=undefined;
},opts.lastDelay);
}
setTimeout(arguments.callee,opts.checkInterval);
}
})();
}