function _856(_857,_858){
var _859=$.data(_857,"datagrid");
var opts=_859.options;
var row=opts.finder.getRow(_857,_858.index);
var _85a=false;
_858.row=_858.row||{};
for(var _85b in _858.row){
if(row[_85b]!==_858.row[_85b]){
_85a=true;
break;
}
}
if(_85a){
if(_6f3(_859.insertedRows,row)==-1){
if(_6f3(_859.updatedRows,row)==-1){
_859.updatedRows.push(row);
}
}
opts.view.updateRow.call(opts.view,_857,_858.index,_858.row);
}
}