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
}