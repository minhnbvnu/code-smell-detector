function _79a(_79b){
var _79c=$.data(_79b,"datagrid");
var opts=_79c.options;
var dc=_79c.dc;
var _79d=dc.view2.children("div.datagrid-header");
var _79e=_79d.children("div.datagrid-header-inner");
dc.body2.css("overflow-x","");
_79f();
_7a0();
_7a1();
_79f(true);
_79e.show();
if(_79d.width()>=_79d.find("table").width()){
dc.body2.css("overflow-x","hidden");
}
if(!opts.showHeader){
_79e.hide();
}
function _7a1(){
if(!opts.fitColumns){
return;
}
if(!_79c.leftWidth){
_79c.leftWidth=0;
}
var _7a2=0;
var cc=[];
var _7a3=_750(_79b,false);
for(var i=0;i<_7a3.length;i++){
var col=_751(_79b,_7a3[i]);
if(_7a4(col)){
_7a2+=col.width;
cc.push({field:col.field,col:col,addingWidth:0});
}
}
if(!_7a2){
return;
}
cc[cc.length-1].addingWidth-=_79c.leftWidth;
_79e.show();
var _7a5=_79d.width()-_79d.find("table").width()-opts.scrollbarSize+_79c.leftWidth;
var rate=_7a5/_7a2;
if(!opts.showHeader){
_79e.hide();
}
for(var i=0;i<cc.length;i++){
var c=cc[i];
var _7a6=parseInt(c.col.width*rate);
c.addingWidth+=_7a6;
_7a5-=_7a6;
}
cc[cc.length-1].addingWidth+=_7a5;
for(var i=0;i<cc.length;i++){
var c=cc[i];
if(c.col.boxWidth+c.addingWidth>0){
c.col.boxWidth+=c.addingWidth;
c.col.width+=c.addingWidth;
}
}
_79c.leftWidth=_7a5;
$(_79b).datagrid("fixColumnSize");
};
function _7a0(){
var _7a7=false;
var _7a8=_750(_79b,true).concat(_750(_79b,false));
$.map(_7a8,function(_7a9){
var col=_751(_79b,_7a9);
if(String(col.width||"").indexOf("%")>=0){
var _7aa=$.parser.parseValue("width",col.width,dc.view,opts.scrollbarSize+(opts.rownumbers?opts.rownumberWidth:0))-col.deltaWidth;
if(_7aa>0){
col.boxWidth=_7aa;
_7a7=true;
}
}
});
if(_7a7){
$(_79b).datagrid("fixColumnSize");
}
};
function _79f(fit){
var _7ab=dc.header1.add(dc.header2).find(".datagrid-cell-group");
if(_7ab.length){
_7ab.each(function(){
$(this)._outerWidth(fit?$(this).parent().width():10);
});
if(fit){
_70c(_79b);
}
}
};
function _7a4(col){
if(String(col.width||"").indexOf("%")>=0){
return false;
}
if(!col.hidden&&!col.checkbox&&!col.auto&&!col.fixed){
return true;
}
};
}