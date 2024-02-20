function _7e3(_7e4,row){
var _7e5=$.data(_7e4,"datagrid");
var opts=_7e5.options;
var rows=_7e5.data.rows;
if(typeof row=="object"){
return _6f3(rows,row);
}else{
for(var i=0;i<rows.length;i++){
if(rows[i][opts.idField]==row){
return i;
}
}
return -1;
}
}