function _763(_818,_819){
var _81a=$.data(_818,"datagrid");
var opts=_81a.options;
var rows=opts.finder.getRows(_818);
if(!_819&&opts.selectOnCheck){
_7fc(_818,true);
}
var dc=_81a.dc;
var hck=dc.header1.add(dc.header2).find("input[type=checkbox]");
var bck=opts.finder.getTr(_818,"","checked").removeClass("datagrid-row-checked").find("div.datagrid-cell-check input[type=checkbox]");
hck.add(bck)._propAttr("checked",false);
if(opts.idField){
for(var i=0;i<rows.length;i++){
_6f4(_81a.checkedRows,opts.idField,rows[i][opts.idField]);
}
}
opts.onUncheckAll.call(_818,rows);
}