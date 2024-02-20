function _78e(_7d4,data){
var _7d5=$.data(_7d4,"datagrid");
var opts=_7d5.options;
var dc=_7d5.dc;
data=opts.loadFilter.call(_7d4,data);
if($.isArray(data)){
data={total:data.length,rows:data};
}
data.total=parseInt(data.total);
_7d5.data=data;
if(data.footer){
_7d5.footer=data.footer;
}
if(!opts.remoteSort&&opts.sortName){
var _7d6=opts.sortName.split(",");
var _7d7=opts.sortOrder.split(",");
data.rows.sort(function(r1,r2){
var r=0;
for(var i=0;i<_7d6.length;i++){
var sn=_7d6[i];
var so=_7d7[i];
var col=_751(_7d4,sn);
var _7d8=col.sorter||function(a,b){
return a==b?0:(a>b?1:-1);
};
r=_7d8(r1[sn],r2[sn])*(so=="asc"?1:-1);
if(r!=0){
return r;
}
}
return r;
});
}
if(opts.view.onBeforeRender){
opts.view.onBeforeRender.call(opts.view,_7d4,data.rows);
}
opts.view.render.call(opts.view,_7d4,dc.body2,false);
opts.view.render.call(opts.view,_7d4,dc.body1,true);
if(opts.showFooter){
opts.view.renderFooter.call(opts.view,_7d4,dc.footer2,false);
opts.view.renderFooter.call(opts.view,_7d4,dc.footer1,true);
}
if(opts.view.onAfterRender){
opts.view.onAfterRender.call(opts.view,_7d4);
}
_7d5.ss.clean();
var _7d9=$(_7d4).datagrid("getPager");
if(_7d9.length){
var _7da=_7d9.pagination("options");
if(_7da.total!=data.total){
_7d9.pagination("refresh",{pageNumber:opts.pageNumber,total:data.total});
if(opts.pageNumber!=_7da.pageNumber&&_7da.pageNumber>0){
opts.pageNumber=_7da.pageNumber;
_78d(_7d4);
}
}
}
_71d(_7d4);
dc.body2.triggerHandler("scroll");
$(_7d4).datagrid("setSelectionState");
$(_7d4).datagrid("autoSizeColumn");
opts.onLoadSuccess.call(_7d4,data);
}