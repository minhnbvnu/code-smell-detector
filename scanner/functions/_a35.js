function _a35(_a36,_a37){
var _a38=$.data(_a36,"treegrid");
var opts=_a38.options;
if(_a37.parent){
var tr=opts.finder.getTr(_a36,_a37.parent);
if(tr.next("tr.treegrid-tr-tree").length==0){
_9f4(_a36,_a37.parent);
}
var cell=tr.children("td[field=\""+opts.treeField+"\"]").children("div.datagrid-cell");
var _a39=cell.children("span.tree-icon");
if(_a39.hasClass("tree-file")){
_a39.removeClass("tree-file").addClass("tree-folder tree-folder-open");
var hit=$("<span class=\"tree-hit tree-expanded\"></span>").insertBefore(_a39);
if(hit.prev().length){
hit.prev().remove();
}
}
}
_9fb(_a36,_a37.parent,_a37.data,_a38.data.length>0,true);
}