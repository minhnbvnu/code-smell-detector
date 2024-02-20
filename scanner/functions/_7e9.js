function _7e9(_7ea){
var _7eb=$.data(_7ea,"datagrid");
var opts=_7eb.options;
if(opts.idField){
return _7eb.checkedRows;
}else{
var rows=[];
opts.finder.getTr(_7ea,"","checked",2).each(function(){
rows.push(opts.finder.getRow(_7ea,$(this)));
});
return rows;
}
}