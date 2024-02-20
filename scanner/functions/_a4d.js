function _a4d(_a4f){
$.map(_a4f,function(node){
if(node.children&&node.children.length){
_a4d(node.children);
}
});
for(var i=0;i<_a4f.length-1;i++){
var node=_a4f[i];
var _a50=t.treegrid("getLevel",node[opts.idField]);
var tr=opts.finder.getTr(_a49,node[opts.idField]);
var cc=tr.next().find("tr.datagrid-row td[field=\""+opts.treeField+"\"] div.datagrid-cell");
cc.find("span:eq("+(_a50-1)+")").addClass("tree-line");
}
}