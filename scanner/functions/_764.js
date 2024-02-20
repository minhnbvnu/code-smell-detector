function _764(_783,_784){
var _785=$.data(_783,"datagrid");
var opts=_785.options;
_784=_784||{};
var _786={sortName:opts.sortName,sortOrder:opts.sortOrder};
if(typeof _784=="object"){
$.extend(_786,_784);
}
var _787=[];
var _788=[];
if(_786.sortName){
_787=_786.sortName.split(",");
_788=_786.sortOrder.split(",");
}
if(typeof _784=="string"){
var _789=_784;
var col=_751(_783,_789);
if(!col.sortable||_785.resizing){
return;
}
var _78a=col.order||"asc";
var pos=_6f3(_787,_789);
if(pos>=0){
var _78b=_788[pos]=="asc"?"desc":"asc";
if(opts.multiSort&&_78b==_78a){
_787.splice(pos,1);
_788.splice(pos,1);
}else{
_788[pos]=_78b;
}
}else{
if(opts.multiSort){
_787.push(_789);
_788.push(_78a);
}else{
_787=[_789];
_788=[_78a];
}
}
_786.sortName=_787.join(",");
_786.sortOrder=_788.join(",");
}
if(opts.onBeforeSortColumn.call(_783,_786.sortName,_786.sortOrder)==false){
return;
}
$.extend(opts,_786);
var dc=_785.dc;
var _78c=dc.header1.add(dc.header2);
_78c.find("div.datagrid-cell").removeClass("datagrid-sort-asc datagrid-sort-desc");
for(var i=0;i<_787.length;i++){
var col=_751(_783,_787[i]);
_78c.find("div."+col.cellClass).addClass("datagrid-sort-"+_788[i]);
}
if(opts.remoteSort){
_78d(_783);
}else{
_78e(_783,$(_783).datagrid("getData"));
}
opts.onSortColumn.call(_783,opts.sortName,opts.sortOrder);
}