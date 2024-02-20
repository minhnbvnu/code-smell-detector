function _be0(_be1,q){
var _be2=$.data(_be1,"combogrid");
var opts=_be2.options;
var grid=_be2.grid;
_be2.remainText=true;
var qq=opts.multiple?q.split(opts.separator):[q];
qq=$.grep(qq,function(q){
return $.trim(q)!="";
});
if(opts.mode=="remote"){
_be3(qq);
grid.datagrid("load",$.extend({},opts.queryParams,{q:q}));
}else{
grid.datagrid("highlightRow",-1);
var rows=grid.datagrid("getRows");
var vv=[];
$.map(qq,function(q){
q=$.trim(q);
var _be4=q;
_be5(opts.mappingRows,q);
_be5(grid.datagrid("getSelections"),q);
var _be6=_be5(rows,q);
if(_be6>=0){
if(opts.reversed){
grid.datagrid("highlightRow",_be6);
}
}else{
$.map(rows,function(row,i){
if(opts.filter.call(_be1,q,row)){
grid.datagrid("highlightRow",i);
}
});
}
});
_be3(vv);
}
function _be5(rows,q){
for(var i=0;i<rows.length;i++){
var row=rows[i];
if((row[opts.textField]||"").toLowerCase()==q.toLowerCase()){
vv.push(row[opts.idField]);
return i;
}
}
return -1;
};
function _be3(vv){
if(!opts.reversed){
_bca(_be1,vv,true);
}
};
}