function _b94(_b95,_b96,_b97){
var _b98=$.data(_b95,"combotree");
var opts=_b98.options;
var tree=_b98.tree;
var _b99=tree.tree("options");
var _b9a=_b99.onBeforeCheck;
var _b9b=_b99.onCheck;
var _b9c=_b99.onSelect;
_b99.onBeforeCheck=_b99.onCheck=_b99.onSelect=function(){
};
if(!$.isArray(_b96)){
_b96=_b96.split(opts.separator);
}
if(!opts.multiple){
_b96=_b96.length?[_b96[0]]:[""];
}
var vv=$.map(_b96,function(_b9d){
return String(_b9d);
});
tree.find("div.tree-node-selected").removeClass("tree-node-selected");
$.map(tree.tree("getChecked"),function(node){
if($.inArray(String(node.id),vv)==-1){
tree.tree("uncheck",node.target);
}
});
var ss=[];
opts.unselectedValues=[];
$.map(vv,function(v){
var node=tree.tree("find",v);
if(node){
tree.tree("check",node.target).tree("select",node.target);
ss.push(_b9e(node));
}else{
ss.push(_b9f(v,opts.mappingRows)||v);
opts.unselectedValues.push(v);
}
});
if(opts.multiple){
$.map(tree.tree("getChecked"),function(node){
var id=String(node.id);
if($.inArray(id,vv)==-1){
vv.push(id);
ss.push(_b9e(node));
}
});
}
_b99.onBeforeCheck=_b9a;
_b99.onCheck=_b9b;
_b99.onSelect=_b9c;
if(!_b97){
var s=ss.join(opts.separator);
if($(_b95).combo("getText")!=s){
$(_b95).combo("setText",s);
}
}
$(_b95).combo("setValues",vv);
function _b9f(_ba0,a){
var item=$.easyui.getArrayItem(a,"id",_ba0);
return item?_b9e(item):undefined;
};
function _b9e(node){
return node[opts.textField||""]||node.text;
};
}