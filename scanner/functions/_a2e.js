function _a2e(_a2f,_a30){
var opts=$.data(_a2f,"treegrid").options;
var _a31=_9d1(_a2f,_a30);
if(_a30){
_a31.unshift(find(_a2f,_a30));
}
for(var i=0;i<_a31.length;i++){
_a22(_a2f,_a31[i][opts.idField]);
}
}