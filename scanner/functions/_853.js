function _853(_854,row){
var data=$.data(_854,"datagrid").data;
var view=$.data(_854,"datagrid").options.view;
var _855=$.data(_854,"datagrid").insertedRows;
view.insertRow.call(view,_854,null,row);
_855.push(row);
$(_854).datagrid("getPager").pagination("refresh",{total:data.total});
}