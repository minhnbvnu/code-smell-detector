function _77b(e){
var tr=_76c(e.target);
if(!tr){
return;
}
var _77c=_75f(tr);
var opts=$.data(_77c,"datagrid").options;
var _77d=_76f(tr);
var row=opts.finder.getRow(_77c,_77d);
var td=$(e.target).closest("td[field]",tr);
if(td.length){
var _77e=td.attr("field");
opts.onDblClickCell.call(_77c,_77d,_77e,row[_77e]);
}
opts.onDblClickRow.apply(_77c,_6f6(_77c,[_77d,row]));
}