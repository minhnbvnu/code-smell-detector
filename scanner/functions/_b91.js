function _b91(_b92){
var _b93=$.data(_b92,"combotree");
var opts=_b93.options;
var tree=_b93.tree;
var vv=[];
if(opts.multiple){
vv=$.map(tree.tree("getChecked"),function(node){
return node.id;
});
}else{
var node=tree.tree("getSelected");
if(node){
vv.push(node.id);
}
}
vv=vv.concat(opts.unselectedValues);
_b94(_b92,vv,_b93.remainText);
}