function _b4e(_b4f){
var _b50=$.data(_b4f,"combobox");
var opts=_b50.options;
$(_b4f).addClass("combobox-f");
$(_b4f).combo($.extend({},opts,{onShowPanel:function(){
$(this).combo("panel").find("div.combobox-item:hidden,div.combobox-group:hidden").show();
_b2c(this,$(this).combobox("getValues"),true);
$(this).combobox("scrollTo",$(this).combobox("getValue"));
opts.onShowPanel.call(this);
}}));
}