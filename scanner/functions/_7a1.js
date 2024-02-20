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
}