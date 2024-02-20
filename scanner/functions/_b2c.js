function _b2c(_b32,_b33,_b34){
var opts=$.data(_b32,"combobox").options;
var _b35=$(_b32).combo("panel");
if(!$.isArray(_b33)){
_b33=_b33.split(opts.separator);
}
if(!opts.multiple){
_b33=_b33.length?[_b33[0]]:[""];
}
var _b36=$(_b32).combo("getValues");
if(_b35.is(":visible")){
_b35.find(".combobox-item-selected").each(function(){
var row=opts.finder.getRow(_b32,$(this));
if(row){
if($.easyui.indexOfArray(_b36,row[opts.valueField])==-1){
$(this).removeClass("combobox-item-selected");
}
}
});
}
$.map(_b36,function(v){
if($.easyui.indexOfArray(_b33,v)==-1){
var el=opts.finder.getEl(_b32,v);
if(el.hasClass("combobox-item-selected")){
el.removeClass("combobox-item-selected");
opts.onUnselect.call(_b32,opts.finder.getRow(_b32,v));
}
}
});
var _b37=null;
var vv=[],ss=[];
for(var i=0;i<_b33.length;i++){
var v=_b33[i];
var s=v;
var row=opts.finder.getRow(_b32,v);
if(row){
s=row[opts.textField];
_b37=row;
var el=opts.finder.getEl(_b32,v);
if(!el.hasClass("combobox-item-selected")){
el.addClass("combobox-item-selected");
opts.onSelect.call(_b32,row);
}
}else{
s=_b38(v,opts.mappingRows)||v;
}
vv.push(v);
ss.push(s);
}
if(!_b34){
$(_b32).combo("setText",ss.join(opts.separator));
}
if(opts.showItemIcon){
var tb=$(_b32).combobox("textbox");
tb.removeClass("textbox-bgicon "+opts.textboxIconCls);
if(_b37&&_b37.iconCls){
tb.addClass("textbox-bgicon "+_b37.iconCls);
opts.textboxIconCls=_b37.iconCls;
}
}
$(_b32).combo("setValues",vv);
_b35.triggerHandler("scroll");
function _b38(_b39,a){
var item=$.easyui.getArrayItem(a,opts.valueField,_b39);
return item?item[opts.textField]:undefined;
};
}