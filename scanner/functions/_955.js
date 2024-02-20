function _955(_95e){
var t=$(_95e);
if(!t.length){
return;
}
var opts=$.data(_95e,"propertygrid").options;
opts.finder.getTr(_95e,null,"editing").each(function(){
var _95f=parseInt($(this).attr("datagrid-row-index"));
if(t.datagrid("validateRow",_95f)){
t.datagrid("endEdit",_95f);
}else{
t.datagrid("cancelEdit",_95f);
}
});
opts.editIndex=undefined;
}