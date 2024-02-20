function _61f(item){
if(!item){
return;
}
$(_619).textbox("button").menubutton({text:item.text,iconCls:(item.iconCls||null),menu:_61a.menu,menuAlign:opts.buttonAlign,plain:false});
_61a.searchbox.find("input.textbox-value").attr("name",item.name||item.text);
$(_619).searchbox("resize");
}