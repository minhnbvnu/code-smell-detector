function _114(_117,_118,_119){
var opts=$.data(_117,"tree").options;
var flag=_119?1:0;
_116(_117,_118,flag);
if(opts.deepCheck){
$.easyui.forEach(_118.children||[],true,function(n){
_116(_117,n,flag);
});
}else{
var _11a=[];
if(_118.children&&_118.children.length){
_11a.push(_118);
}
$.easyui.forEach(_118.children||[],true,function(n){
if(!n.hidden){
_116(_117,n,flag);
if(n.children&&n.children.length){
_11a.push(n);
}
}
});
for(var i=_11a.length-1;i>=0;i--){
var node=_11a[i];
_116(_117,node,_11b(node));
}
}
}