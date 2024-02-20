function _849(_84a,_84b){
var _84c=$.data(_84a,"datagrid");
var opts=_84c.options;
var data=_84c.data;
var _84d=_84c.insertedRows;
var _84e=_84c.deletedRows;
$(_84a).datagrid("cancelEdit",_84b);
var row=opts.finder.getRow(_84a,_84b);
if(_6f3(_84d,row)>=0){
_6f4(_84d,row);
}else{
_84e.push(row);
}
_6f4(_84c.selectedRows,opts.idField,row[opts.idField]);
_6f4(_84c.checkedRows,opts.idField,row[opts.idField]);
opts.view.deleteRow.call(opts.view,_84a,_84b);
if(opts.height=="auto"){
_71d(_84a);
}
$(_84a).datagrid("getPager").pagination("refresh",{total:data.total});
}