function _843(_844,_845){
var _846=$.data(_844,"datagrid").insertedRows;
var _847=$.data(_844,"datagrid").deletedRows;
var _848=$.data(_844,"datagrid").updatedRows;
if(!_845){
var rows=[];
rows=rows.concat(_846);
rows=rows.concat(_847);
rows=rows.concat(_848);
return rows;
}else{
if(_845=="inserted"){
return _846;
}else{
if(_845=="deleted"){
return _847;
}else{
if(_845=="updated"){
return _848;
}
}
}
}
return [];
}