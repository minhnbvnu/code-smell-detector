function _76a(_76b){
return function(e){
var tr=_76c(e.target);
if(!tr){
return;
}
var _76d=_75f(tr);
if($.data(_76d,"datagrid").resizing){
return;
}
var _76e=_76f(tr);
if(_76b){
_770(_76d,_76e);
}else{
var opts=$.data(_76d,"datagrid").options;
opts.finder.getTr(_76d,_76e).removeClass("datagrid-row-over");
}
};
}