function _a3a(_a3b,_a3c){
var ref=_a3c.before||_a3c.after;
var opts=$.data(_a3b,"treegrid").options;
var _a3d=_9ef(_a3b,ref);
_a35(_a3b,{parent:(_a3d?_a3d[opts.idField]:null),data:[_a3c.data]});
var _a3e=_a3d?_a3d.children:$(_a3b).treegrid("getRoots");
for(var i=0;i<_a3e.length;i++){
if(_a3e[i][opts.idField]==ref){
var _a3f=_a3e[_a3e.length-1];
_a3e.splice(_a3c.before?i:(i+1),0,_a3f);
_a3e.splice(_a3e.length-1,1);
break;
}
}
_a40(true);
_a40(false);
_9d5(_a3b);
$(_a3b).treegrid("showLines");
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
};
}