function _78d(_870,_871,cb){
var opts=$.data(_870,"datagrid").options;
if(_871){
opts.queryParams=_871;
}
var _872=$.extend({},opts.queryParams);
if(opts.pagination){
$.extend(_872,{page:opts.pageNumber||1,rows:opts.pageSize});
}
if(opts.sortName&&opts.remoteSort){
$.extend(_872,{sort:opts.sortName,order:opts.sortOrder});
}
if(opts.onBeforeLoad.call(_870,_872)==false){
opts.view.setEmptyMsg(_870);
return;
}
$(_870).datagrid("loading");
var _873=opts.loader.call(_870,_872,function(data){
$(_870).datagrid("loaded");
$(_870).datagrid("loadData",data);
if(cb){
cb();
}
},function(){
$(_870).datagrid("loaded");
opts.onLoadError.apply(_870,arguments);
});
if(_873==false){
$(_870).datagrid("loaded");
opts.view.setEmptyMsg(_870);
}
}