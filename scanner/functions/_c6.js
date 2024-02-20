function _c6(_c7,_c8){
var _c9=$.data(_c7,"pagination");
var _ca=_c9.options;
_ca.loading=_c8;
if(_ca.showRefresh&&_c9.bb.refresh){
_c9.bb.refresh.linkbutton({iconCls:(_ca.loading?"pagination-loading":"pagination-load")});
}
}