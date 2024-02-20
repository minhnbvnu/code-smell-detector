function _183(_184,_185){
if($.isFunction(_185)){
var fn=_185;
}else{
var _185=typeof _185=="object"?_185:{id:_185};
var fn=function(node){
for(var p in _185){
if(node[p]!=_185[p]){
return false;
}
}
return true;
};
}
var _186=null;
var data=$.data(_184,"tree").data;
$.easyui.forEach(data,true,function(node){
if(fn.call(_184,node)==true){
_186=_172(node);
return false;
}
});
return _186;
}