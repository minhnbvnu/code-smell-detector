function _9f4(_9f5,_9f6){
var opts=$.data(_9f5,"treegrid").options;
var tr1=opts.finder.getTr(_9f5,_9f6,"body",1);
var tr2=opts.finder.getTr(_9f5,_9f6,"body",2);
var _9f7=$(_9f5).datagrid("getColumnFields",true).length+(opts.rownumbers?1:0);
var _9f8=$(_9f5).datagrid("getColumnFields",false).length;
_9f9(tr1,_9f7);
_9f9(tr2,_9f8);
function _9f9(tr,_9fa){
$("<tr class=\"treegrid-tr-tree\">"+"<td style=\"border:0px\" colspan=\""+_9fa+"\">"+"<div></div>"+"</td>"+"</tr>").insertAfter(tr);
};
}