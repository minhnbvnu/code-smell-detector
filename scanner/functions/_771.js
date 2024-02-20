function _771(e){
var tr=_76c(e.target);
if(!tr){
return;
}
var _772=_75f(tr);
var opts=$.data(_772,"datagrid").options;
var _773=_76f(tr);
var tt=$(e.target);
if(tt.parent().hasClass("datagrid-cell-check")){
if(opts.singleSelect&&opts.selectOnCheck){
tt._propAttr("checked",!tt.is(":checked"));
_774(_772,_773);
}else{
if(tt.is(":checked")){
tt._propAttr("checked",false);
_774(_772,_773);
}else{
tt._propAttr("checked",true);
_775(_772,_773);
}
}
}else{
var row=opts.finder.getRow(_772,_773);
var td=tt.closest("td[field]",tr);
if(td.length){
var _776=td.attr("field");
opts.onClickCell.call(_772,_773,_776,row[_776]);
}
if(opts.singleSelect==true){
_777(_772,_773);
}else{
if(opts.ctrlSelect){
if(e.metaKey||e.ctrlKey){
if(tr.hasClass("datagrid-row-selected")){
_778(_772,_773);
}else{
_777(_772,_773);
}
}else{
if(e.shiftKey){
$(_772).datagrid("clearSelections");
var _779=Math.min(opts.lastSelectedIndex||0,_773);
var _77a=Math.max(opts.lastSelectedIndex||0,_773);
for(var i=_779;i<=_77a;i++){
_777(_772,i);
}
}else{
$(_772).datagrid("clearSelections");
_777(_772,_773);
opts.lastSelectedIndex=_773;
}
}
}else{
if(tr.hasClass("datagrid-row-selected")){
_778(_772,_773);
}else{
_777(_772,_773);
}
}
}
opts.onClickRow.apply(_772,_6f6(_772,[_773,row]));
}
}