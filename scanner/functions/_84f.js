function _84f(_850,_851){
var data=$.data(_850,"datagrid").data;
var view=$.data(_850,"datagrid").options.view;
var _852=$.data(_850,"datagrid").insertedRows;
view.insertRow.call(view,_850,_851.index,_851.row);
_852.push(_851.row);
$(_850).datagrid("getPager").pagination("refresh",{total:data.total});
}