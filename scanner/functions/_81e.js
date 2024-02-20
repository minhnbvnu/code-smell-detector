function _81e(_836,_837){
var opts=$.data(_836,"datagrid").options;
var tr=opts.finder.getTr(_836,_837);
tr.children("td").each(function(){
var cell=$(this).find("div.datagrid-cell");
var _838=$(this).attr("field");
var col=_751(_836,_838);
if(col&&col.editor){
var _839,_83a;
if(typeof col.editor=="string"){
_839=col.editor;
}else{
_839=col.editor.type;
_83a=col.editor.options;
}
var _83b=opts.editors[_839];
if(_83b){
var _83c=cell.html();
var _83d=cell._outerWidth();
cell.addClass("datagrid-editable");
cell._outerWidth(_83d);
cell.html("<table border=\"0\" cellspacing=\"0\" cellpadding=\"1\"><tr><td></td></tr></table>");
cell.children("table").bind("click dblclick contextmenu",function(e){
e.stopPropagation();
});
$.data(cell[0],"datagrid.editor",{actions:_83b,target:_83b.init(cell.find("td"),$.extend({height:opts.editorHeight},_83a)),field:_838,type:_839,oldHtml:_83c});
}
}
});
_71d(_836,_837,true);
}