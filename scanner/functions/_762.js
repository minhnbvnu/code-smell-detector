function _762(_815,_816){
var _817=$.data(_815,"datagrid");
var opts=_817.options;
var rows=opts.finder.getRows(_815);
if(!_816&&opts.selectOnCheck){
_801(_815,true);
}
var dc=_817.dc;
var hck=dc.header1.add(dc.header2).find("input[type=checkbox]");
var bck=opts.finder.getTr(_815,"","allbody").addClass("datagrid-row-checked").find("div.datagrid-cell-check input[type=checkbox]");
hck.add(bck)._propAttr("checked",true);
if(opts.idField){
for(var i=0;i<rows.length;i++){
_6f5(_817.checkedRows,opts.idField,rows[i]);
}
}
opts.onCheckAll.call(_815,rows);
}