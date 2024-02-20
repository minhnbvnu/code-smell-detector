function _195(_196,_197){
var opts=$.data(_196,"tree").options;
$(_197).css("position","");
var _198=$(_197).find("input.tree-editor");
var val=_198.val();
_198.remove();
var node=_eb(_196,_197);
node.text=val;
_12d(_196,node);
opts.onAfterEdit.call(_196,node);
}