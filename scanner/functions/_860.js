function _860(_861){
var data=$.data(_861,"datagrid").data;
var ok=true;
for(var i=0,len=data.rows.length;i<len;i++){
if(_820(_861,i)){
$(_861).datagrid("endEdit",i);
}else{
ok=false;
}
}
if(ok){
_85c(_861);
}
}