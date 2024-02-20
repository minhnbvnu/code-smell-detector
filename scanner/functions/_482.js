function _482(_483,_484,data){
var opts=$(_483).sidemenu("options");
var tt=$("<ul class=\"sidemenu-tree\"></ul>").appendTo(_484);
tt.tree({data:data,animate:opts.animate,onBeforeSelect:function(node){
if(node.children){
return false;
}
},onSelect:function(node){
_485(_483,node.id,true);
},onExpand:function(node){
_492(_483,node);
},onCollapse:function(node){
_492(_483,node);
},onClick:function(node){
if(node.children){
if(node.state=="open"){
$(node.target).addClass("tree-node-nonleaf-collapsed");
}else{
$(node.target).removeClass("tree-node-nonleaf-collapsed");
}
$(this).tree("toggle",node.target);
}
}});
tt.unbind(".sidemenu").bind("mouseleave.sidemenu",function(){
$(_484).trigger("mouseleave");
});
_485(_483,opts.selectedItemId);
}