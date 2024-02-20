function _bca(_bcf,_bd0,_bd1){
var _bd2=$.data(_bcf,"combogrid");
var opts=_bd2.options;
var grid=_bd2.grid;
var _bd3=$(_bcf).combo("getValues");
var _bd4=$(_bcf).combo("options");
var _bd5=_bd4.onChange;
_bd4.onChange=function(){
};
var _bd6=grid.datagrid("options");
var _bd7=_bd6.onSelect;
var _bd8=_bd6.onUnselectAll;
_bd6.onSelect=_bd6.onUnselectAll=function(){
};
if(!$.isArray(_bd0)){
_bd0=_bd0.split(opts.separator);
}
if(!opts.multiple){
_bd0=_bd0.length?[_bd0[0]]:[""];
}
var vv=$.map(_bd0,function(_bd9){
return String(_bd9);
});
vv=$.grep(vv,function(v,_bda){
return _bda===$.inArray(v,vv);
});
var _bdb=$.grep(grid.datagrid("getSelections"),function(row,_bdc){
return $.inArray(String(row[opts.idField]),vv)>=0;
});
grid.datagrid("clearSelections");
grid.data("datagrid").selectedRows=_bdb;
var ss=[];
opts.unselectedValues=[];
$.map(vv,function(v){
var _bdd=grid.datagrid("getRowIndex",v);
if(_bdd>=0){
grid.datagrid("selectRow",_bdd);
}else{
opts.unselectedValues.push(v);
}
ss.push(_bde(v,grid.datagrid("getRows"))||_bde(v,_bdb)||_bde(v,opts.mappingRows)||v);
});
$(_bcf).combo("setValues",_bd3);
_bd4.onChange=_bd5;
_bd6.onSelect=_bd7;
_bd6.onUnselectAll=_bd8;
if(!_bd1){
var s=ss.join(opts.separator);
if($(_bcf).combo("getText")!=s){
$(_bcf).combo("setText",s);
}
}
$(_bcf).combo("setValues",_bd0);
function _bde(_bdf,a){
var item=$.easyui.getArrayItem(a,opts.idField,_bdf);
return item?item[opts.textField]:undefined;
};
}