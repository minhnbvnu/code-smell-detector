function _7db(_7dc){
var _7dd=$.data(_7dc,"datagrid");
var opts=_7dd.options;
var dc=_7dd.dc;
dc.header1.add(dc.header2).find("input[type=checkbox]")._propAttr("checked",false);
if(opts.idField){
var _7de=$.data(_7dc,"treegrid")?true:false;
var _7df=opts.onSelect;
var _7e0=opts.onCheck;
opts.onSelect=opts.onCheck=function(){
};
var rows=opts.finder.getRows(_7dc);
for(var i=0;i<rows.length;i++){
var row=rows[i];
var _7e1=_7de?row[opts.idField]:$(_7dc).datagrid("getRowIndex",row[opts.idField]);
if(_7e2(_7dd.selectedRows,row)){
_777(_7dc,_7e1,true,true);
}
if(_7e2(_7dd.checkedRows,row)){
_774(_7dc,_7e1,true);
}
}
opts.onSelect=_7df;
opts.onCheck=_7e0;
}
function _7e2(a,r){
for(var i=0;i<a.length;i++){
if(a[i][opts.idField]==r[opts.idField]){
a[i]=r;
return true;
}
}
return false;
};
}