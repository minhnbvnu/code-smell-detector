function _77f(e){
var tr=_76c(e.target);
if(tr){
var _780=_75f(tr);
var opts=$.data(_780,"datagrid").options;
var _781=_76f(tr);
var row=opts.finder.getRow(_780,_781);
opts.onRowContextMenu.call(_780,e,_781,row);
}else{
var body=_76c(e.target,".datagrid-body");
if(body){
var _780=_75f(body);
var opts=$.data(_780,"datagrid").options;
opts.onRowContextMenu.call(_780,e,-1,null);
}
}
}