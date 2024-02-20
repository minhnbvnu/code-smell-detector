function _774(_80c,_80d,_80e){
var _80f=$.data(_80c,"datagrid");
var opts=_80f.options;
var row=opts.finder.getRow(_80c,_80d);
if(!row){
return;
}
if(opts.onBeforeCheck.apply(_80c,_6f6(_80c,[_80d,row]))==false){
return;
}
if(opts.singleSelect&&opts.selectOnCheck){
_763(_80c,true);
_80f.checkedRows=[];
}
if(!_80e&&opts.selectOnCheck){
_777(_80c,_80d,true);
}
var tr=opts.finder.getTr(_80c,_80d).addClass("datagrid-row-checked");
tr.find("div.datagrid-cell-check input[type=checkbox]")._propAttr("checked",true);
tr=opts.finder.getTr(_80c,"","checked",2);
if(tr.length==opts.finder.getRows(_80c).length){
var dc=_80f.dc;
dc.header1.add(dc.header2).find("input[type=checkbox]")._propAttr("checked",true);
}
if(opts.idField){
_6f5(_80f.checkedRows,opts.idField,row);
}
opts.onCheck.apply(_80c,_6f6(_80c,[_80d,row]));
}