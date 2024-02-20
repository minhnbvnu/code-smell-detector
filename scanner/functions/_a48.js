function _a48(_a49){
var t=$(_a49);
var opts=t.treegrid("options");
if(opts.lines){
t.treegrid("getPanel").addClass("tree-lines");
}else{
t.treegrid("getPanel").removeClass("tree-lines");
return;
}
t.treegrid("getPanel").find("span.tree-indent").removeClass("tree-line tree-join tree-joinbottom");
t.treegrid("getPanel").find("div.datagrid-cell").removeClass("tree-node-last tree-root-first tree-root-one");
var _a4a=t.treegrid("getRoots");
if(_a4a.length>1){
_a4b(_a4a[0]).addClass("tree-root-first");
}else{
if(_a4a.length==1){
_a4b(_a4a[0]).addClass("tree-root-one");
}
}
_a4c(_a4a);
_a4d(_a4a);
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
};
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
};
function _a4b(node){
var tr=opts.finder.getTr(_a49,node[opts.idField]);
var cell=tr.find("td[field=\""+opts.treeField+"\"] div.datagrid-cell");
return cell;
};
}