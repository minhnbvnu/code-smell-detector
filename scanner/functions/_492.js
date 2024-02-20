function _492(_493,item){
_48b(_493,function(t){
var node=t.tree("find",item.id);
if(node){
var _494=t.tree("options");
var _495=_494.animate;
_494.animate=false;
t.tree(item.state=="open"?"expand":"collapse",node.target);
_494.animate=_495;
}
});
}