function _c3f(_c40){
var t=$(_c40);
var opts=t.tagbox("options");
if(opts.limitToList){
var _c41=t.tagbox("panel");
var item=_c41.children("div.combobox-item-hover");
if(item.length){
item.removeClass("combobox-item-hover");
var row=opts.finder.getRow(_c40,item);
var _c42=row[opts.valueField];
$(_c40).tagbox(item.hasClass("combobox-item-selected")?"unselect":"select",_c42);
}
$(_c40).tagbox("hidePanel");
}else{
var v=$.trim($(_c40).tagbox("getText"));
if(v!==""){
var _c43=$(_c40).tagbox("getValues");
_c43.push(v);
$(_c40).tagbox("setValues",_c43);
}
}
}