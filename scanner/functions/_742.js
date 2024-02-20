function _742(){
var _74e=[[".datagrid-header-rownumber",(opts.rownumberWidth-1)+"px"],[".datagrid-cell-rownumber",(opts.rownumberWidth-1)+"px"]];
var _74f=_750(_73c,true).concat(_750(_73c));
for(var i=0;i<_74f.length;i++){
var col=_751(_73c,_74f[i]);
if(col&&!col.checkbox){
_74e.push(["."+col.cellClass,col.boxWidth?col.boxWidth+"px":"auto"]);
}
}
_73d.ss.add(_74e);
_73d.ss.dirty(_73d.cellSelectorPrefix);
_73d.cellSelectorPrefix="."+_73d.cellClassPrefix;
}