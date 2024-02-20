function _85c(_85d){
var _85e=$.data(_85d,"datagrid");
var data=_85e.data;
var rows=data.rows;
var _85f=[];
for(var i=0;i<rows.length;i++){
_85f.push($.extend({},rows[i]));
}
_85e.originalRows=_85f;
_85e.updatedRows=[];
_85e.insertedRows=[];
_85e.deletedRows=[];
}