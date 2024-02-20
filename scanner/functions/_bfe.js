function _bfe(_bff){
var _c00=$.data(_bff,"combotreegrid");
var opts=_c00.options;
var grid=_c00.grid;
var vv=[];
if(opts.multiple){
vv=$.map(grid.treegrid("getCheckedNodes"),function(row){
return row[opts.idField];
});
}else{
var row=grid.treegrid("getSelected");
if(row){
vv.push(row[opts.idField]);
}
}
vv=vv.concat(opts.unselectedValues);
_c01(_bff,vv);
}