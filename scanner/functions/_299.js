function _299(left,top,_29a,_29b){
var _29c=this;
var _29d=$.data(_29c,"window");
var opts=_29d.options;
if(!opts.constrain){
return {};
}
if($.isFunction(opts.constrain)){
return opts.constrain.call(_29c,left,top,_29a,_29b);
}
var win=$(_29c).window("window");
var _29e=opts.inline?win.parent():$(window);
if(left<0){
left=0;
}
if(top<_29e.scrollTop()){
top=_29e.scrollTop();
}
if(left+_29a>_29e.width()){
if(_29a==win.outerWidth()){
left=_29e.width()-_29a;
}else{
_29a=_29e.width()-left;
}
}
if(top-_29e.scrollTop()+_29b>_29e.height()){
if(_29b==win.outerHeight()){
top=_29e.height()-_29b+_29e.scrollTop();
}else{
_29b=_29e.height()-top+_29e.scrollTop();
}
}
return {left:left,top:top,width:_29a,height:_29b};
}