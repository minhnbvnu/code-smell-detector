function _b4a(_b4b){
var t=$(_b4b);
var opts=t.combobox("options");
var _b4c=t.combobox("panel");
var item=_b4c.children("div.combobox-item-hover");
if(item.length){
item.removeClass("combobox-item-hover");
var row=opts.finder.getRow(_b4b,item);
var _b4d=row[opts.valueField];
if(opts.multiple){
if(item.hasClass("combobox-item-selected")){
t.combobox("unselect",_b4d);
}else{
t.combobox("select",_b4d);
}
}else{
t.combobox("select",_b4d);
}
}
var vv=[];
$.map(t.combobox("getValues"),function(v){
if(_b1b(_b4b,v)>=0){
vv.push(v);
}
});
t.combobox("setValues",vv);
if(!opts.multiple){
t.combobox("hidePanel");
}
}