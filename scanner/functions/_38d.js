function _38d(_38e){
var _38f=$.data(_38e,"tabs");
var tabs=_38f.tabs;
for(var i=0;i<tabs.length;i++){
var opts=tabs[i].panel("options");
if(opts.selected&&!opts.disabled){
_373(_38e,i);
return;
}
}
_373(_38e,_38f.options.selected);
}