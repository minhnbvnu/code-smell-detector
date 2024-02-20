function _a85(_a86){
var _a87=$(_a7f).treegrid("getColumnFields",_a86);
var tr=opts.finder.getTr(_a7f,id,"body",(_a86?1:2));
var _a88=tr.find("div.datagrid-cell-rownumber").html();
var _a89=tr.find("div.datagrid-cell-check input[type=checkbox]").is(":checked");
tr.html(this.renderRow(_a7f,_a87,_a86,_a81,_a80));
tr.attr("style",_a82||"");
tr.find("div.datagrid-cell-rownumber").html(_a88);
if(_a89){
tr.find("div.datagrid-cell-check input[type=checkbox]")._propAttr("checked",true);
}
if(_a84!=id){
tr.attr("id",_a83+"-"+(_a86?1:2)+"-"+_a84);
tr.attr("node-id",_a84);
}
}