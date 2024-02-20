function _880(name){
function isA(_881){
return $.data($(_881)[0],name)!=undefined;
};
return {init:function(_882,_883){
var _884=$("<input type=\"text\" class=\"datagrid-editable-input\">").appendTo(_882);
if(_884[name]&&name!="text"){
return _884[name](_883);
}else{
return _884;
}
},destroy:function(_885){
if(isA(_885,name)){
$(_885)[name]("destroy");
}
},getValue:function(_886){
if(isA(_886,name)){
var opts=$(_886)[name]("options");
if(opts.multiple){
return $(_886)[name]("getValues").join(opts.separator);
}else{
return $(_886)[name]("getValue");
}
}else{
return $(_886).val();
}
},setValue:function(_887,_888){
if(isA(_887,name)){
var opts=$(_887)[name]("options");
if(opts.multiple){
if(_888){
$(_887)[name]("setValues",_888.split(opts.separator));
}else{
$(_887)[name]("clear");
}
}else{
$(_887)[name]("setValue",_888);
}
}else{
$(_887).val(_888);
}
},resize:function(_889,_88a){
if(isA(_889,name)){
$(_889)[name]("resize",_88a);
}else{
$(_889)._size({width:_88a,height:$.fn.datagrid.defaults.editorHeight});
}
}};
}