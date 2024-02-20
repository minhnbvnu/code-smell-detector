function _9d5(_9d6){
var dc=$.data(_9d6,"datagrid").dc;
var opts=$.data(_9d6,"treegrid").options;
if(!opts.rownumbers){
return;
}
dc.body1.find("div.datagrid-cell-rownumber").each(function(i){
$(this).html(i+1);
});
}