function _a44(_a45,_a46){
var _a47=$.data(_a45,"treegrid");
var opts=_a47.options;
var prow=_9ef(_a45,_a46);
$(_a45).datagrid("deleteRow",_a46);
$.easyui.removeArrayItem(_a47.checkedRows,opts.idField,_a46);
_9d5(_a45);
if(prow){
_9f1(_a45,prow[opts.idField]);
}
_a47.total-=1;
$(_a45).datagrid("getPager").pagination("refresh",{total:_a47.total});
$(_a45).treegrid("showLines");
}