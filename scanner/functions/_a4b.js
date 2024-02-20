function _a4b(node){
var tr=opts.finder.getTr(_a49,node[opts.idField]);
var cell=tr.find("td[field=\""+opts.treeField+"\"] div.datagrid-cell");
return cell;
}