function _9d1(_a14,_a15){
var data=$.data(_a14,"treegrid").data;
if(_a15){
var _a16=find(_a14,_a15);
data=_a16?(_a16.children||[]):[];
}
var _a17=[];
$.easyui.forEach(data,true,function(node){
_a17.push(node);
});
return _a17;
}