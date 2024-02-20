function _a22(_a23,_a24){
var opts=$.data(_a23,"treegrid").options;
var tr=opts.finder.getTr(_a23,_a24);
var hit=tr.find("span.tree-hit");
var row=find(_a23,_a24);
if(hit.length==0){
return;
}
if(hit.hasClass("tree-expanded")){
return;
}
if(opts.onBeforeExpand.call(_a23,row)==false){
return;
}
hit.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded");
hit.next().addClass("tree-folder-open");
var _a25=tr.next("tr.treegrid-tr-tree");
if(_a25.length){
var cc=_a25.children("td").children("div");
_a26(cc);
}else{
_9f4(_a23,row[opts.idField]);
var _a25=tr.next("tr.treegrid-tr-tree");
var cc=_a25.children("td").children("div");
cc.hide();
var _a27=$.extend({},opts.queryParams||{});
_a27.id=row[opts.idField];
_9cc(_a23,row[opts.idField],_a27,true,function(){
if(cc.is(":empty")){
_a25.remove();
}else{
_a26(cc);
}
});
}
function _a26(cc){
row.state="open";
if(opts.animate){
cc.slideDown("normal",function(){
$(_a23).treegrid("autoSizeColumn");
_9cd(_a23,_a24);
opts.onExpand.call(_a23,row);
});
}else{
cc.show();
$(_a23).treegrid("autoSizeColumn");
_9cd(_a23,_a24);
opts.onExpand.call(_a23,row);
}
};
}