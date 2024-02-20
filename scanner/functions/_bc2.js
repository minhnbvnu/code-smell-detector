function _bc2(){
var dg=$(this);
var _bc6=_bbb(dg);
var _bc7=$(_bc6).data("combogrid");
var opts=_bc7.options;
var vv=$.map(dg.datagrid("getSelections"),function(row){
return row[opts.idField];
});
vv=vv.concat(opts.unselectedValues);
var _bc8=dg.data("datagrid").dc.body2;
var _bc9=_bc8.scrollTop();
_bca(_bc6,vv,_bc7.remainText);
_bc8.scrollTop(_bc9);
}