function _b8b(_b8c){
var _b8d=$.data(_b8c,"combotree");
var opts=_b8d.options;
var tree=_b8d.tree;
$(_b8c).addClass("combotree-f");
$(_b8c).combo($.extend({},opts,{onShowPanel:function(){
if(opts.editable){
tree.tree("doFilter","");
}
opts.onShowPanel.call(this);
}}));
var _b8e=$(_b8c).combo("panel");
if(!tree){
tree=$("<ul></ul>").appendTo(_b8e);
_b8d.tree=tree;
}
tree.tree($.extend({},opts,{checkbox:opts.multiple,onLoadSuccess:function(node,data){
var _b8f=$(_b8c).combotree("getValues");
if(opts.multiple){
$.map(tree.tree("getChecked"),function(node){
$.easyui.addArrayItem(_b8f,node.id);
});
}
_b94(_b8c,_b8f,_b8d.remainText);
opts.onLoadSuccess.call(this,node,data);
},onClick:function(node){
if(opts.multiple){
$(this).tree(node.checked?"uncheck":"check",node.target);
}else{
$(_b8c).combo("hidePanel");
}
_b8d.remainText=false;
_b91(_b8c);
opts.onClick.call(this,node);
},onCheck:function(node,_b90){
_b8d.remainText=false;
_b91(_b8c);
opts.onCheck.call(this,node,_b90);
}}));
}