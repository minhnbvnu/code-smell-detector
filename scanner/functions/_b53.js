function _b53(e){
var _b54=$(this).panel("options").comboTarget;
if(!_b54){
return;
}
var opts=$(_b54).combobox("options");
var item=$(e.target).closest("div.combobox-item");
if(!item.length||item.hasClass("combobox-item-disabled")){
return;
}
var row=opts.finder.getRow(_b54,item);
if(!row){
return;
}
if(opts.blurTimer){
clearTimeout(opts.blurTimer);
opts.blurTimer=null;
}
opts.onClick.call(_b54,row);
var _b55=row[opts.valueField];
if(opts.multiple){
if(item.hasClass("combobox-item-selected")){
_b2d(_b54,_b55);
}else{
_b27(_b54,_b55);
}
}else{
$(_b54).combobox("setValue",_b55).combobox("hidePanel");
}
e.stopPropagation();
}