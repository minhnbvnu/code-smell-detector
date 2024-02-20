function _732(_733,_734){
function _735(){
var _736=[];
var _737=[];
$(_733).children("thead").each(function(){
var opt=$.parser.parseOptions(this,[{frozen:"boolean"}]);
$(this).find("tr").each(function(){
var cols=[];
$(this).find("th").each(function(){
var th=$(this);
var col=$.extend({},$.parser.parseOptions(this,["id","field","align","halign","order","width",{sortable:"boolean",checkbox:"boolean",resizable:"boolean",fixed:"boolean"},{rowspan:"number",colspan:"number"}]),{title:(th.html()||undefined),hidden:(th.attr("hidden")?true:undefined),formatter:(th.attr("formatter")?eval(th.attr("formatter")):undefined),styler:(th.attr("styler")?eval(th.attr("styler")):undefined),sorter:(th.attr("sorter")?eval(th.attr("sorter")):undefined)});
if(col.width&&String(col.width).indexOf("%")==-1){
col.width=parseInt(col.width);
}
if(th.attr("editor")){
var s=$.trim(th.attr("editor"));
if(s.substr(0,1)=="{"){
col.editor=eval("("+s+")");
}else{
col.editor=s;
}
}
cols.push(col);
});
opt.frozen?_736.push(cols):_737.push(cols);
});
});
return [_736,_737];
};
var _738=$("<div class=\"datagrid-wrap\">"+"<div class=\"datagrid-view\">"+"<div class=\"datagrid-view1\">"+"<div class=\"datagrid-header\">"+"<div class=\"datagrid-header-inner\"></div>"+"</div>"+"<div class=\"datagrid-body\">"+"<div class=\"datagrid-body-inner\"></div>"+"</div>"+"<div class=\"datagrid-footer\">"+"<div class=\"datagrid-footer-inner\"></div>"+"</div>"+"</div>"+"<div class=\"datagrid-view2\">"+"<div class=\"datagrid-header\">"+"<div class=\"datagrid-header-inner\"></div>"+"</div>"+"<div class=\"datagrid-body\"></div>"+"<div class=\"datagrid-footer\">"+"<div class=\"datagrid-footer-inner\"></div>"+"</div>"+"</div>"+"</div>"+"</div>").insertAfter(_733);
_738.panel({doSize:false,cls:"datagrid"});
$(_733).addClass("datagrid-f").hide().appendTo(_738.children("div.datagrid-view"));
var cc=_735();
var view=_738.children("div.datagrid-view");
var _739=view.children("div.datagrid-view1");
var _73a=view.children("div.datagrid-view2");
return {panel:_738,frozenColumns:cc[0],columns:cc[1],dc:{view:view,view1:_739,view2:_73a,header1:_739.children("div.datagrid-header").children("div.datagrid-header-inner"),header2:_73a.children("div.datagrid-header").children("div.datagrid-header-inner"),body1:_739.children("div.datagrid-body").children("div.datagrid-body-inner"),body2:_73a.children("div.datagrid-body"),footer1:_739.children("div.datagrid-footer").children("div.datagrid-footer-inner"),footer2:_73a.children("div.datagrid-footer").children("div.datagrid-footer-inner")}};
}