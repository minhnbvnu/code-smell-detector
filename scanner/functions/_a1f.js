function _a1f(_a20,_a21){
var opts=$.data(_a20,"treegrid").options;
var row=find(_a20,_a21);
var tr=opts.finder.getTr(_a20,_a21);
var hit=tr.find("span.tree-hit");
if(hit.length==0){
return;
}
if(hit.hasClass("tree-collapsed")){
return;
}
if(opts.onBeforeCollapse.call(_a20,row)==false){
return;
}
hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
hit.next().removeClass("tree-folder-open");
row.state="closed";
tr=tr.next("tr.treegrid-tr-tree");
var cc=tr.children("td").children("div");
if(opts.animate){
cc.slideUp("normal",function(){
$(_a20).treegrid("autoSizeColumn");
_9cd(_a20,_a21);
opts.onCollapse.call(_a20,row);
});
}else{
cc.hide();
$(_a20).treegrid("autoSizeColumn");
_9cd(_a20,_a21);
opts.onCollapse.call(_a20,row);
}
}