function _485(_48e,_48f,_490){
var _491=null;
var opts=$(_48e).sidemenu("options");
_48b(_48e,function(t){
t.find("div.tree-node-selected").removeClass("tree-node-selected");
var node=t.tree("find",_48f);
if(node){
$(node.target).addClass("tree-node-selected");
opts.selectedItemId=node.id;
t.trigger("mouseleave.sidemenu");
_491=node;
}
});
if(_490&&_491){
opts.onSelect.call(_48e,_491);
}
}