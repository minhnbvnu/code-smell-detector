function _752(_753){
var _754=$.data(_753,"datagrid");
var _755=_754.panel;
var opts=_754.options;
var dc=_754.dc;
var _756=dc.header1.add(dc.header2);
_756.unbind(".datagrid");
for(var _757 in opts.headerEvents){
_756.bind(_757+".datagrid",opts.headerEvents[_757]);
}
var _758=_756.find("div.datagrid-cell");
var _759=opts.resizeHandle=="right"?"e":(opts.resizeHandle=="left"?"w":"e,w");
_758.each(function(){
$(this).resizable({handles:_759,edge:opts.resizeEdge,disabled:($(this).attr("resizable")?$(this).attr("resizable")=="false":false),minWidth:25,onStartResize:function(e){
_754.resizing=true;
_756.css("cursor",$("body").css("cursor"));
if(!_754.proxy){
_754.proxy=$("<div class=\"datagrid-resize-proxy\"></div>").appendTo(dc.view);
}
if(e.data.dir=="e"){
e.data.deltaEdge=$(this)._outerWidth()-(e.pageX-$(this).offset().left);
}else{
e.data.deltaEdge=$(this).offset().left-e.pageX-1;
}
_754.proxy.css({left:e.pageX-$(_755).offset().left-1+e.data.deltaEdge,display:"none"});
setTimeout(function(){
if(_754.proxy){
_754.proxy.show();
}
},500);
},onResize:function(e){
_754.proxy.css({left:e.pageX-$(_755).offset().left-1+e.data.deltaEdge,display:"block"});
return false;
},onStopResize:function(e){
_756.css("cursor","");
$(this).css("height","");
var _75a=$(this).parent().attr("field");
var col=_751(_753,_75a);
col.width=$(this)._outerWidth()+1;
col.boxWidth=col.width-col.deltaWidth;
col.auto=undefined;
$(this).css("width","");
$(_753).datagrid("fixColumnSize",_75a);
_754.proxy.remove();
_754.proxy=null;
if($(this).parents("div:first.datagrid-header").parent().hasClass("datagrid-view1")){
_70c(_753);
}
$(_753).datagrid("fitColumns");
opts.onResizeColumn.call(_753,_75a,col.width);
setTimeout(function(){
_754.resizing=false;
},0);
}});
});
var bb=dc.body1.add(dc.body2);
bb.unbind();
for(var _757 in opts.rowEvents){
bb.bind(_757,opts.rowEvents[_757]);
}
dc.body1.bind("mousewheel DOMMouseScroll",function(e){
e.preventDefault();
var e1=e.originalEvent||window.event;
var _75b=e1.wheelDelta||e1.detail*(-1);
if("deltaY" in e1){
_75b=e1.deltaY*-1;
}
var dg=$(e.target).closest("div.datagrid-view").children(".datagrid-f");
var dc=dg.data("datagrid").dc;
dc.body2.scrollTop(dc.body2.scrollTop()-_75b);
});
dc.body2.bind("scroll",function(){
var b1=dc.view1.children("div.datagrid-body");
var stv=$(this).scrollTop();
$(this).scrollTop(stv);
b1.scrollTop(stv);
var c1=dc.body1.children(":first");
var c2=dc.body2.children(":first");
if(c1.length&&c2.length){
var top1=c1.offset().top;
var top2=c2.offset().top;
if(top1!=top2){
b1.scrollTop(b1.scrollTop()+top1-top2);
}
}
dc.view2.children("div.datagrid-header,div.datagrid-footer")._scrollLeft($(this)._scrollLeft());
dc.body2.children("table.datagrid-btable-frozen").css("left",-$(this)._scrollLeft());
});
}