function _956(_957){
var _958=$.data(_957,"propertygrid");
var opts=$.data(_957,"propertygrid").options;
$(_957).datagrid($.extend({},opts,{cls:"propertygrid",view:(opts.showGroup?opts.groupView:opts.view),onBeforeEdit:function(_959,row){
if(opts.onBeforeEdit.call(_957,_959,row)==false){
return false;
}
var dg=$(this);
var row=dg.datagrid("getRows")[_959];
var col=dg.datagrid("getColumnOption","value");
col.editor=row.editor;
},onClickCell:function(_95a,_95b,_95c){
if(_954!=this){
_955(_954);
_954=this;
}
if(opts.editIndex!=_95a){
_955(_954);
$(this).datagrid("beginEdit",_95a);
var ed=$(this).datagrid("getEditor",{index:_95a,field:_95b});
if(!ed){
ed=$(this).datagrid("getEditor",{index:_95a,field:"value"});
}
if(ed){
var t=$(ed.target);
var _95d=t.data("textbox")?t.textbox("textbox"):t;
_95d.focus();
opts.editIndex=_95a;
}
}
opts.onClickCell.call(_957,_95a,_95b,_95c);
},loadFilter:function(data){
_955(this);
return opts.loadFilter.call(this,data);
}}));
}