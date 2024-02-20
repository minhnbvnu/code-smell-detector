function _9cc(_a05,_a06,_a07,_a08,_a09){
var opts=$.data(_a05,"treegrid").options;
var body=$(_a05).datagrid("getPanel").find("div.datagrid-body");
if(_a06==undefined&&opts.queryParams){
opts.queryParams.id=undefined;
}
if(_a07){
opts.queryParams=_a07;
}
var _a0a=$.extend({},opts.queryParams);
if(opts.pagination){
$.extend(_a0a,{page:opts.pageNumber,rows:opts.pageSize});
}
if(opts.sortName){
$.extend(_a0a,{sort:opts.sortName,order:opts.sortOrder});
}
var row=find(_a05,_a06);
if(opts.onBeforeLoad.call(_a05,row,_a0a)==false){
return;
}
var _a0b=body.find("tr[node-id=\""+_a06+"\"] span.tree-folder");
_a0b.addClass("tree-loading");
$(_a05).treegrid("loading");
var _a0c=opts.loader.call(_a05,_a0a,function(data){
_a0b.removeClass("tree-loading");
$(_a05).treegrid("loaded");
_9fb(_a05,_a06,data,_a08);
if(_a09){
_a09();
}
},function(){
_a0b.removeClass("tree-loading");
$(_a05).treegrid("loaded");
opts.onLoadError.apply(_a05,arguments);
if(_a09){
_a09();
}
});
if(_a0c==false){
_a0b.removeClass("tree-loading");
$(_a05).treegrid("loaded");
}
}