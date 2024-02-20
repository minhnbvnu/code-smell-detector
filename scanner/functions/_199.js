function _199(_19a,_19b){
var opts=$.data(_19a,"tree").options;
$(_19b).css("position","");
$(_19b).find("input.tree-editor").remove();
var node=_eb(_19a,_19b);
_12d(_19a,node);
opts.onCancelEdit.call(_19a,node);
}