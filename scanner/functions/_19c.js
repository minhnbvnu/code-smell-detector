function _19c(_19d,q){
var _19e=$.data(_19d,"tree");
var opts=_19e.options;
var ids={};
$.easyui.forEach(_19e.data,true,function(node){
if(opts.filter.call(_19d,q,node)){
$("#"+node.domId).removeClass("tree-node-hidden");
ids[node.domId]=1;
node.hidden=false;
}else{
$("#"+node.domId).addClass("tree-node-hidden");
node.hidden=true;
}
});
for(var id in ids){
_19f(id);
}
function _19f(_1a0){
var p=$(_19d).tree("getParent",$("#"+_1a0)[0]);
while(p){
$(p.target).removeClass("tree-node-hidden");
p.hidden=false;
p=$(_19d).tree("getParent",p.target);
}
};
}