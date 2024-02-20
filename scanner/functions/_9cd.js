function _9cd(_9ce,_9cf){
var opts=$.data(_9ce,"datagrid").options;
var dc=$.data(_9ce,"datagrid").dc;
if(!dc.body1.is(":empty")&&(!opts.nowrap||opts.autoRowHeight)){
if(_9cf!=undefined){
var _9d0=_9d1(_9ce,_9cf);
for(var i=0;i<_9d0.length;i++){
_9d2(_9d0[i][opts.idField]);
}
}
}
$(_9ce).datagrid("fixRowHeight",_9cf);
function _9d2(_9d3){
var tr1=opts.finder.getTr(_9ce,_9d3,"body",1);
var tr2=opts.finder.getTr(_9ce,_9d3,"body",2);
tr1.css("height","");
tr2.css("height","");
var _9d4=Math.max(tr1.height(),tr2.height());
tr1.css("height",_9d4);
tr2.css("height",_9d4);
};
}