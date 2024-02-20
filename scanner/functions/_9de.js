function _9de(_9e0,_9e1,_9e2,_9e3){
var _9e4=$.data(_9e0,"treegrid");
var _9e5=_9e4.checkedRows;
var opts=_9e4.options;
if(!opts.checkbox){
return;
}
var row=find(_9e0,_9e1);
if(!row.checkState){
return;
}
var tr=opts.finder.getTr(_9e0,_9e1);
var ck=tr.find(".tree-checkbox");
if(_9e2==undefined){
if(ck.hasClass("tree-checkbox1")){
_9e2=false;
}else{
if(ck.hasClass("tree-checkbox0")){
_9e2=true;
}else{
if(row._checked==undefined){
row._checked=ck.hasClass("tree-checkbox1");
}
_9e2=!row._checked;
}
}
}
row._checked=_9e2;
if(_9e2){
if(ck.hasClass("tree-checkbox1")){
return;
}
}else{
if(ck.hasClass("tree-checkbox0")){
return;
}
}
if(!_9e3){
if(opts.onBeforeCheckNode.call(_9e0,row,_9e2)==false){
return;
}
}
if(opts.cascadeCheck){
_9e6(_9e0,row,_9e2);
_9e7(_9e0,row);
}else{
_9e8(_9e0,row,_9e2?"1":"0");
}
if(!_9e3){
opts.onCheckNode.call(_9e0,row,_9e2);
}
}