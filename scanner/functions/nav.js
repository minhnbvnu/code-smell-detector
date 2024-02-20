function nav(_bcb,dir){
var _bcc=$.data(_bcb,"combogrid");
var opts=_bcc.options;
var grid=_bcc.grid;
var _bcd=grid.datagrid("getRows").length;
if(!_bcd){
return;
}
var tr=opts.finder.getTr(grid[0],null,"highlight");
if(!tr.length){
tr=opts.finder.getTr(grid[0],null,"selected");
}
var _bce;
if(!tr.length){
_bce=(dir=="next"?0:_bcd-1);
}else{
var _bce=parseInt(tr.attr("datagrid-row-index"));
_bce+=(dir=="next"?1:-1);
if(_bce<0){
_bce=_bcd-1;
}
if(_bce>=_bcd){
_bce=0;
}
}
grid.datagrid("highlightRow",_bce);
if(opts.selectOnNavigation){
_bcc.remainText=false;
grid.datagrid("selectRow",_bce);
}
}