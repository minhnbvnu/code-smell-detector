function _7e6(_7e7){
var _7e8=$.data(_7e7,"datagrid");
var opts=_7e8.options;
var data=_7e8.data;
if(opts.idField){
return _7e8.selectedRows;
}else{
var rows=[];
opts.finder.getTr(_7e7,"","selected",2).each(function(){
rows.push(opts.finder.getRow(_7e7,$(this)));
});
return rows;
}
}