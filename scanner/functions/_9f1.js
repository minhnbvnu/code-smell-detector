function _9f1(_9f2,_9f3){
var opts=$.data(_9f2,"treegrid").options;
if(!opts.checkbox){
return;
}
var row=find(_9f2,_9f3);
var tr=opts.finder.getTr(_9f2,_9f3);
var ck=tr.find(".tree-checkbox");
if(opts.view.hasCheckbox(_9f2,row)){
if(!ck.length){
row.checkState=row.checkState||"unchecked";
$("<span class=\"tree-checkbox\"></span>").insertBefore(tr.find(".tree-title"));
}
if(row.checkState=="checked"){
_9de(_9f2,_9f3,true,true);
}else{
if(row.checkState=="unchecked"){
_9de(_9f2,_9f3,false,true);
}else{
var flag=_9f0(row);
if(flag===0){
_9de(_9f2,_9f3,false,true);
}else{
if(flag===1){
_9de(_9f2,_9f3,true,true);
}
}
}
}
}else{
ck.remove();
row.checkState=undefined;
row.checked=undefined;
_9e7(_9f2,row);
}
}