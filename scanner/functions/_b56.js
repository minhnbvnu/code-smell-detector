function _b56(e){
var _b57=$(this).panel("options").comboTarget;
if(!_b57){
return;
}
var opts=$(_b57).combobox("options");
if(opts.groupPosition=="sticky"){
var _b58=$(this).children(".combobox-stick");
if(!_b58.length){
_b58=$("<div class=\"combobox-stick\"></div>").appendTo(this);
}
_b58.hide();
var _b59=$(_b57).data("combobox");
$(this).children(".combobox-group:visible").each(function(){
var g=$(this);
var _b5a=opts.finder.getGroup(_b57,g);
var _b5b=_b59.data[_b5a.startIndex+_b5a.count-1];
var last=opts.finder.getEl(_b57,_b5b[opts.valueField]);
if(g.position().top<0&&last.position().top>0){
_b58.show().html(g.html());
return false;
}
});
}
}