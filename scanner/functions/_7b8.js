function _7b8(_7b9,_7ba){
var _7bb=$.data(_7b9,"datagrid");
var opts=_7bb.options;
var dc=_7bb.dc;
var _7bc=dc.view.find("table.datagrid-btable,table.datagrid-ftable");
_7bc.css("table-layout","fixed");
if(_7ba){
fix(_7ba);
}else{
var ff=_750(_7b9,true).concat(_750(_7b9,false));
for(var i=0;i<ff.length;i++){
fix(ff[i]);
}
}
_7bc.css("table-layout","");
_7bd(_7b9);
_71d(_7b9);
_7be(_7b9);
function fix(_7bf){
var col=_751(_7b9,_7bf);
if(col.cellClass){
_7bb.ss.set("."+col.cellClass,col.boxWidth?col.boxWidth+"px":"auto");
}
};
}