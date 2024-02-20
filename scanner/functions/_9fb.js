function _9fb(_9fc,_9fd,data,_9fe,_9ff){
var _a00=$.data(_9fc,"treegrid");
var opts=_a00.options;
var dc=_a00.dc;
data=opts.loadFilter.call(_9fc,data,_9fd);
var node=find(_9fc,_9fd);
if(node){
var _a01=opts.finder.getTr(_9fc,_9fd,"body",1);
var _a02=opts.finder.getTr(_9fc,_9fd,"body",2);
var cc1=_a01.next("tr.treegrid-tr-tree").children("td").children("div");
var cc2=_a02.next("tr.treegrid-tr-tree").children("td").children("div");
if(!_9fe){
node.children=[];
}
}else{
var cc1=dc.body1;
var cc2=dc.body2;
if(!_9fe){
_a00.data=[];
}
}
if(!_9fe){
cc1.empty();
cc2.empty();
}
if(opts.view.onBeforeRender){
opts.view.onBeforeRender.call(opts.view,_9fc,_9fd,data);
}
opts.view.render.call(opts.view,_9fc,cc1,true);
opts.view.render.call(opts.view,_9fc,cc2,false);
if(opts.showFooter){
opts.view.renderFooter.call(opts.view,_9fc,dc.footer1,true);
opts.view.renderFooter.call(opts.view,_9fc,dc.footer2,false);
}
if(opts.view.onAfterRender){
opts.view.onAfterRender.call(opts.view,_9fc);
}
if(!_9fd&&opts.pagination){
var _a03=$.data(_9fc,"treegrid").total;
var _a04=$(_9fc).datagrid("getPager");
if(_a04.pagination("options").total!=_a03){
_a04.pagination({total:_a03});
}
}
_9cd(_9fc);
_9d5(_9fc);
$(_9fc).treegrid("showLines");
$(_9fc).treegrid("setSelectionState");
$(_9fc).treegrid("autoSizeColumn");
if(!_9ff){
opts.onLoadSuccess.call(_9fc,node,data);
}
}