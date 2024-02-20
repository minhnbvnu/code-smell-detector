function _be7(_be8){
var _be9=$.data(_be8,"combogrid");
var opts=_be9.options;
var grid=_be9.grid;
var tr=opts.finder.getTr(grid[0],null,"highlight");
_be9.remainText=false;
if(tr.length){
var _bea=parseInt(tr.attr("datagrid-row-index"));
if(opts.multiple){
if(tr.hasClass("datagrid-row-selected")){
grid.datagrid("unselectRow",_bea);
}else{
grid.datagrid("selectRow",_bea);
}
}else{
grid.datagrid("selectRow",_bea);
}
}
var vv=[];
$.map(grid.datagrid("getSelections"),function(row){
vv.push(row[opts.idField]);
});
$.map(opts.unselectedValues,function(v){
if($.easyui.indexOfArray(opts.mappingRows,opts.idField,v)>=0){
$.easyui.addArrayItem(vv,v);
}
});
$(_be8).combogrid("setValues",vv);
if(!opts.multiple){
$(_be8).combogrid("hidePanel");
}
}