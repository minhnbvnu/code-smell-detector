function _81b(_81c,_81d){
var opts=$.data(_81c,"datagrid").options;
var tr=opts.finder.getTr(_81c,_81d);
var row=opts.finder.getRow(_81c,_81d);
if(tr.hasClass("datagrid-row-editing")){
return;
}
if(opts.onBeforeEdit.apply(_81c,_6f6(_81c,[_81d,row]))==false){
return;
}
tr.addClass("datagrid-row-editing");
_81e(_81c,_81d);
_7be(_81c);
tr.find("div.datagrid-editable").each(function(){
var _81f=$(this).parent().attr("field");
var ed=$.data(this,"datagrid.editor");
ed.actions.setValue(ed.target,row[_81f]);
});
_820(_81c,_81d);
opts.onBeginEdit.apply(_81c,_6f6(_81c,[_81d,row]));
}