function _bf5(_bf6){
var _bf7=$.data(_bf6,"combotreegrid");
var opts=_bf7.options;
$(_bf6).addClass("combotreegrid-f").combo($.extend({},opts,{onShowPanel:function(){
var p=$(this).combotreegrid("panel");
var _bf8=p.outerHeight()-p.height();
var _bf9=p._size("minHeight");
var _bfa=p._size("maxHeight");
var dg=$(this).combotreegrid("grid");
dg.treegrid("resize",{width:"100%",height:(isNaN(parseInt(opts.panelHeight))?"auto":"100%"),minHeight:(_bf9?_bf9-_bf8:""),maxHeight:(_bfa?_bfa-_bf8:"")});
var row=dg.treegrid("getSelected");
if(row){
dg.treegrid("scrollTo",row[opts.idField]);
}
opts.onShowPanel.call(this);
}}));
if(!_bf7.grid){
var _bfb=$(_bf6).combo("panel");
_bf7.grid=$("<table></table>").appendTo(_bfb);
}
_bf7.grid.treegrid($.extend({},opts,{border:false,checkbox:opts.multiple,onLoadSuccess:function(row,data){
var _bfc=$(_bf6).combotreegrid("getValues");
if(opts.multiple){
$.map($(this).treegrid("getCheckedNodes"),function(row){
$.easyui.addArrayItem(_bfc,row[opts.idField]);
});
}
_c01(_bf6,_bfc);
opts.onLoadSuccess.call(this,row,data);
_bf7.remainText=false;
},onClickRow:function(row){
if(opts.multiple){
$(this).treegrid(row.checked?"uncheckNode":"checkNode",row[opts.idField]);
$(this).treegrid("unselect",row[opts.idField]);
}else{
$(_bf6).combo("hidePanel");
}
_bfe(_bf6);
opts.onClickRow.call(this,row);
},onCheckNode:function(row,_bfd){
_bfe(_bf6);
opts.onCheckNode.call(this,row,_bfd);
}}));
}