function _ba1(_ba2,q){
var _ba3=$.data(_ba2,"combotree");
var opts=_ba3.options;
var tree=_ba3.tree;
_ba3.remainText=true;
tree.tree("doFilter",opts.multiple?q.split(opts.separator):q);
}