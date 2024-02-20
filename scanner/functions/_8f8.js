function _8f8(_8f9){
var tr=opts.finder.getTr(_8f2,_8f3,"body",(_8f9?1:2));
if(!tr.length){
return;
}
var _8fa=$(_8f2).datagrid("getColumnFields",_8f9);
var _8fb=tr.find("div.datagrid-cell-check input[type=checkbox]").is(":checked");
tr.html(this.renderRow.call(this,_8f2,_8fa,_8f9,_8f3,_8f4));
var _8fc=(tr.hasClass("datagrid-row-checked")?" datagrid-row-checked":"")+(tr.hasClass("datagrid-row-selected")?" datagrid-row-selected":"");
tr.attr("style",_8f6).attr("class",cls+_8fc);
if(_8fb){
tr.find("div.datagrid-cell-check input[type=checkbox]")._propAttr("checked",true);
}
}