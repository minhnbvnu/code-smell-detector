function _c0f(_c10){
var _c11=$.data(_c10,"combotreegrid");
var opts=_c11.options;
var grid=_c11.grid;
var tr=opts.finder.getTr(grid[0],null,"highlight");
_c11.remainText=false;
if(tr.length){
var id=tr.attr("node-id");
if(opts.multiple){
if(tr.hasClass("datagrid-row-selected")){
grid.treegrid("uncheckNode",id);
}else{
grid.treegrid("checkNode",id);
}
}else{
grid.treegrid("selectRow",id);
}
}
var vv=[];
if(opts.multiple){
$.map(grid.treegrid("getCheckedNodes"),function(row){
vv.push(row[opts.idField]);
});
}else{
var row=grid.treegrid("getSelected");
if(row){
vv.push(row[opts.idField]);
}
}
$.map(opts.unselectedValues,function(v){
if($.easyui.indexOfArray(opts.mappingRows,opts.idField,v)>=0){
$.easyui.addArrayItem(vv,v);
}
});
$(_c10).combotreegrid("setValues",vv);
if(!opts.multiple){
$(_c10).combotreegrid("hidePanel");
}
}