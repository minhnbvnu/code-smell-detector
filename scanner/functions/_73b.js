function _73b(_73c){
var _73d=$.data(_73c,"datagrid");
var opts=_73d.options;
var dc=_73d.dc;
var _73e=_73d.panel;
_73d.ss=$(_73c).datagrid("createStyleSheet");
_73e.panel($.extend({},opts,{id:null,doSize:false,onResize:function(_73f,_740){
if($.data(_73c,"datagrid")){
_70c(_73c);
$(_73c).datagrid("fitColumns");
opts.onResize.call(_73e,_73f,_740);
}
},onExpand:function(){
if($.data(_73c,"datagrid")){
$(_73c).datagrid("fixRowHeight").datagrid("fitColumns");
opts.onExpand.call(_73e);
}
}}));
_73d.rowIdPrefix="datagrid-row-r"+(++_6f2);
_73d.cellClassPrefix="datagrid-cell-c"+_6f2;
_741(dc.header1,opts.frozenColumns,true);
_741(dc.header2,opts.columns,false);
_742();
dc.header1.add(dc.header2).css("display",opts.showHeader?"block":"none");
dc.footer1.add(dc.footer2).css("display",opts.showFooter?"block":"none");
if(opts.toolbar){
if($.isArray(opts.toolbar)){
$("div.datagrid-toolbar",_73e).remove();
var tb=$("<div class=\"datagrid-toolbar\"><table cellspacing=\"0\" cellpadding=\"0\"><tr></tr></table></div>").prependTo(_73e);
var tr=tb.find("tr");
for(var i=0;i<opts.toolbar.length;i++){
var btn=opts.toolbar[i];
if(btn=="-"){
$("<td><div class=\"datagrid-btn-separator\"></div></td>").appendTo(tr);
}else{
var td=$("<td></td>").appendTo(tr);
var tool=$("<a href=\"javascript:;\"></a>").appendTo(td);
tool[0].onclick=eval(btn.handler||function(){
});
tool.linkbutton($.extend({},btn,{plain:true}));
}
}
}else{
$(opts.toolbar).addClass("datagrid-toolbar").prependTo(_73e);
$(opts.toolbar).show();
}
}else{
$("div.datagrid-toolbar",_73e).remove();
}
$("div.datagrid-pager",_73e).remove();
if(opts.pagination){
var _743=$("<div class=\"datagrid-pager\"></div>");
if(opts.pagePosition=="bottom"){
_743.appendTo(_73e);
}else{
if(opts.pagePosition=="top"){
_743.addClass("datagrid-pager-top").prependTo(_73e);
}else{
var ptop=$("<div class=\"datagrid-pager datagrid-pager-top\"></div>").prependTo(_73e);
_743.appendTo(_73e);
_743=_743.add(ptop);
}
}
_743.pagination({total:0,pageNumber:opts.pageNumber,pageSize:opts.pageSize,pageList:opts.pageList,onSelectPage:function(_744,_745){
opts.pageNumber=_744||1;
opts.pageSize=_745;
_743.pagination("refresh",{pageNumber:_744,pageSize:_745});
_78d(_73c);
}});
opts.pageSize=_743.pagination("options").pageSize;
}
function _741(_746,_747,_748){
if(!_747){
return;
}
$(_746).show();
$(_746).empty();
var tmp=$("<div class=\"datagrid-cell\" style=\"position:absolute;left:-99999px\"></div>").appendTo("body");
tmp._outerWidth(99);
var _749=100-parseInt(tmp[0].style.width);
tmp.remove();
var _74a=[];
var _74b=[];
var _74c=[];
if(opts.sortName){
_74a=opts.sortName.split(",");
_74b=opts.sortOrder.split(",");
}
var t=$("<table class=\"datagrid-htable\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"><tbody></tbody></table>").appendTo(_746);
for(var i=0;i<_747.length;i++){
var tr=$("<tr class=\"datagrid-header-row\"></tr>").appendTo($("tbody",t));
var cols=_747[i];
for(var j=0;j<cols.length;j++){
var col=cols[j];
var attr="";
if(col.rowspan){
attr+="rowspan=\""+col.rowspan+"\" ";
}
if(col.colspan){
attr+="colspan=\""+col.colspan+"\" ";
if(!col.id){
col.id=["datagrid-td-group"+_6f2,i,j].join("-");
}
}
if(col.id){
attr+="id=\""+col.id+"\"";
}
var td=$("<td "+attr+"></td>").appendTo(tr);
if(col.checkbox){
td.attr("field",col.field);
$("<div class=\"datagrid-header-check\"></div>").html("<input type=\"checkbox\"/>").appendTo(td);
}else{
if(col.field){
td.attr("field",col.field);
td.append("<div class=\"datagrid-cell\"><span></span><span class=\"datagrid-sort-icon\"></span></div>");
td.find("span:first").html(col.title);
var cell=td.find("div.datagrid-cell");
var pos=_6f3(_74a,col.field);
if(pos>=0){
cell.addClass("datagrid-sort-"+_74b[pos]);
}
if(col.sortable){
cell.addClass("datagrid-sort");
}
if(col.resizable==false){
cell.attr("resizable","false");
}
if(col.width){
var _74d=$.parser.parseValue("width",col.width,dc.view,opts.scrollbarSize+(opts.rownumbers?opts.rownumberWidth:0));
col.deltaWidth=_749;
col.boxWidth=_74d-_749;
}else{
col.auto=true;
}
cell.css("text-align",(col.halign||col.align||""));
col.cellClass=_73d.cellClassPrefix+"-"+col.field.replace(/[\.|\s]/g,"-");
cell.addClass(col.cellClass);
}else{
$("<div class=\"datagrid-cell-group\"></div>").html(col.title).appendTo(td);
}
}
if(col.hidden){
td.hide();
_74c.push(col.field);
}
}
}
if(_748&&opts.rownumbers){
var td=$("<td rowspan=\""+opts.frozenColumns.length+"\"><div class=\"datagrid-header-rownumber\"></div></td>");
if($("tr",t).length==0){
td.wrap("<tr class=\"datagrid-header-row\"></tr>").parent().appendTo($("tbody",t));
}else{
td.prependTo($("tr:first",t));
}
}
for(var i=0;i<_74c.length;i++){
_78f(_73c,_74c[i],-1);
}
};
function _742(){
var _74e=[[".datagrid-header-rownumber",(opts.rownumberWidth-1)+"px"],[".datagrid-cell-rownumber",(opts.rownumberWidth-1)+"px"]];
var _74f=_750(_73c,true).concat(_750(_73c));
for(var i=0;i<_74f.length;i++){
var col=_751(_73c,_74f[i]);
if(col&&!col.checkbox){
_74e.push(["."+col.cellClass,col.boxWidth?col.boxWidth+"px":"auto"]);
}
}
_73d.ss.add(_74e);
_73d.ss.dirty(_73d.cellSelectorPrefix);
_73d.cellSelectorPrefix="."+_73d.cellClassPrefix;
};
}