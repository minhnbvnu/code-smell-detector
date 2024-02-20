function _bb1(_bb2){
var _bb3=$.data(_bb2,"combogrid");
var opts=_bb3.options;
var grid=_bb3.grid;
$(_bb2).addClass("combogrid-f").combo($.extend({},opts,{onShowPanel:function(){
_bca(this,$(this).combogrid("getValues"),true);
var p=$(this).combogrid("panel");
var _bb4=p.outerHeight()-p.height();
var _bb5=p._size("minHeight");
var _bb6=p._size("maxHeight");
var dg=$(this).combogrid("grid");
dg.datagrid("resize",{width:"100%",height:(isNaN(parseInt(opts.panelHeight))?"auto":"100%"),minHeight:(_bb5?_bb5-_bb4:""),maxHeight:(_bb6?_bb6-_bb4:"")});
var row=dg.datagrid("getSelected");
if(row){
dg.datagrid("scrollTo",dg.datagrid("getRowIndex",row));
}
opts.onShowPanel.call(this);
}}));
var _bb7=$(_bb2).combo("panel");
if(!grid){
grid=$("<table></table>").appendTo(_bb7);
_bb3.grid=grid;
}
grid.datagrid($.extend({},opts,{border:false,singleSelect:(!opts.multiple),onLoadSuccess:_bb8,onClickRow:_bb9,onSelect:_bba("onSelect"),onUnselect:_bba("onUnselect"),onSelectAll:_bba("onSelectAll"),onUnselectAll:_bba("onUnselectAll")}));
function _bbb(dg){
return $(dg).closest(".combo-panel").panel("options").comboTarget||_bb2;
};
function _bb8(data){
var _bbc=_bbb(this);
var _bbd=$(_bbc).data("combogrid");
var opts=_bbd.options;
var _bbe=$(_bbc).combo("getValues");
_bca(_bbc,_bbe,_bbd.remainText);
opts.onLoadSuccess.call(this,data);
};
function _bb9(_bbf,row){
var _bc0=_bbb(this);
var _bc1=$(_bc0).data("combogrid");
var opts=_bc1.options;
_bc1.remainText=false;
_bc2.call(this);
if(!opts.multiple){
$(_bc0).combo("hidePanel");
}
opts.onClickRow.call(this,_bbf,row);
};
function _bba(_bc3){
return function(_bc4,row){
var _bc5=_bbb(this);
var opts=$(_bc5).combogrid("options");
if(_bc3=="onUnselectAll"){
if(opts.multiple){
_bc2.call(this);
}
}else{
_bc2.call(this);
}
opts[_bc3].call(this,_bc4,row);
};
};
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
};
}