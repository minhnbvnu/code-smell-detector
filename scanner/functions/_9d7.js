function _9d7(_9d8){
return function(e){
$.fn.datagrid.defaults.rowEvents[_9d8?"mouseover":"mouseout"](e);
var tt=$(e.target);
var fn=_9d8?"addClass":"removeClass";
if(tt.hasClass("tree-hit")){
tt.hasClass("tree-expanded")?tt[fn]("tree-expanded-hover"):tt[fn]("tree-collapsed-hover");
}
};
}