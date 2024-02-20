function _a32(_a33,_a34){
var opts=$.data(_a33,"treegrid").options;
var ids=[];
var p=_9ef(_a33,_a34);
while(p){
var id=p[opts.idField];
ids.unshift(id);
p=_9ef(_a33,id);
}
for(var i=0;i<ids.length;i++){
_a22(_a33,ids[i]);
}
}