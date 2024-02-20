function _775(_810,_811,_812){
var _813=$.data(_810,"datagrid");
var opts=_813.options;
var row=opts.finder.getRow(_810,_811);
if(!row){
return;
}
if(opts.onBeforeUncheck.apply(_810,_6f6(_810,[_811,row]))==false){
return;
}
if(!_812&&opts.selectOnCheck){
_778(_810,_811,true);
}
var tr=opts.finder.getTr(_810,_811).removeClass("datagrid-row-checked");
tr.find("div.datagrid-cell-check input[type=checkbox]")._propAttr("checked",false);
var dc=_813.dc;
var _814=dc.header1.add(dc.header2);
_814.find("input[type=checkbox]")._propAttr("checked",false);
if(opts.idField){
_6f4(_813.checkedRows,opts.idField,row[opts.idField]);
}
opts.onUncheck.apply(_810,_6f6(_810,[_811,row]));
}