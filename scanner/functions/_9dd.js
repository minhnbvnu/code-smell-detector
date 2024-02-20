function _9dd(_a28,_a29){
var opts=$.data(_a28,"treegrid").options;
var tr=opts.finder.getTr(_a28,_a29);
var hit=tr.find("span.tree-hit");
if(hit.hasClass("tree-expanded")){
_a1f(_a28,_a29);
}else{
_a22(_a28,_a29);
}
}