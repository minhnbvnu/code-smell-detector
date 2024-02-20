function _a40(_a41){
var _a42=_a41?1:2;
var tr=opts.finder.getTr(_a3b,_a3c.data[opts.idField],"body",_a42);
var _a43=tr.closest("table.datagrid-btable");
tr=tr.parent().children();
var dest=opts.finder.getTr(_a3b,ref,"body",_a42);
if(_a3c.before){
tr.insertBefore(dest);
}else{
var sub=dest.next("tr.treegrid-tr-tree");
tr.insertAfter(sub.length?sub:dest);
}
_a43.remove();
}