function _7bd(_7c0,tds){
var dc=$.data(_7c0,"datagrid").dc;
tds=tds||dc.view.find("td.datagrid-td-merged");
tds.each(function(){
var td=$(this);
var _7c1=td.attr("colspan")||1;
if(_7c1>1){
var col=_751(_7c0,td.attr("field"));
var _7c2=col.boxWidth+col.deltaWidth-1;
for(var i=1;i<_7c1;i++){
td=td.next();
col=_751(_7c0,td.attr("field"));
_7c2+=col.boxWidth+col.deltaWidth;
}
$(this).children("div.datagrid-cell")._outerWidth(_7c2);
}
});
}