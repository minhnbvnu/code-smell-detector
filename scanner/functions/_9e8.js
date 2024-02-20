function _9e8(_9e9,row,flag){
var _9ea=$.data(_9e9,"treegrid");
var _9eb=_9ea.checkedRows;
var opts=_9ea.options;
if(!row.checkState||flag==undefined){
return;
}
var tr=opts.finder.getTr(_9e9,row[opts.idField]);
var ck=tr.find(".tree-checkbox");
if(!ck.length){
return;
}
row.checkState=["unchecked","checked","indeterminate"][flag];
row.checked=(row.checkState=="checked");
ck.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
ck.addClass("tree-checkbox"+flag);
if(flag==0){
$.easyui.removeArrayItem(_9eb,opts.idField,row[opts.idField]);
}else{
$.easyui.addArrayItem(_9eb,opts.idField,row);
}
}