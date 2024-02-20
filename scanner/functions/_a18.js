function _a18(_a19,_a1a){
var opts=$.data(_a19,"treegrid").options;
var tr=opts.finder.getTr(_a19,_a1a);
var node=tr.children("td[field=\""+opts.treeField+"\"]");
return node.find("span.tree-indent,span.tree-hit").length;
}