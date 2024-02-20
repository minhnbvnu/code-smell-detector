function _75c(_75d){
return function(e){
var td=$(e.target).closest("td[field]");
if(td.length){
var _75e=_75f(td);
if(!$(_75e).data("datagrid").resizing&&_75d){
td.addClass("datagrid-header-over");
}else{
td.removeClass("datagrid-header-over");
}
}
};
}