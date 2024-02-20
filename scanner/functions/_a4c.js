function _a4c(_a4e){
$.map(_a4e,function(node){
if(node.children&&node.children.length){
_a4c(node.children);
}else{
var cell=_a4b(node);
cell.find(".tree-icon").prev().addClass("tree-join");
}
});
if(_a4e.length){
var cell=_a4b(_a4e[_a4e.length-1]);
cell.addClass("tree-node-last");
cell.find(".tree-join").removeClass("tree-join").addClass("tree-joinbottom");
}
}