function _80(e){
var _81=$(e.data.target).resizable("options");
var tt=$(e.data.target);
var dir="";
var _82=tt.offset();
var _83=tt.outerWidth();
var _84=tt.outerHeight();
var _85=_81.edge;
if(e.pageY>_82.top&&e.pageY<_82.top+_85){
dir+="n";
}else{
if(e.pageY<_82.top+_84&&e.pageY>_82.top+_84-_85){
dir+="s";
}
}
if(e.pageX>_82.left&&e.pageX<_82.left+_85){
dir+="w";
}else{
if(e.pageX<_82.left+_83&&e.pageX>_82.left+_83-_85){
dir+="e";
}
}
var _86=_81.handles.split(",");
_86=$.map(_86,function(h){
return $.trim(h).toLowerCase();
});
if($.inArray("all",_86)>=0||$.inArray(dir,_86)>=0){
return dir;
}
for(var i=0;i<dir.length;i++){
var _87=$.inArray(dir.substr(i,1),_86);
if(_87>=0){
return _86[_87];
}
}
return "";
}