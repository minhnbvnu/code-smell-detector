function _a2a(_a2b,_a2c){
var opts=$.data(_a2b,"treegrid").options;
var _a2d=_9d1(_a2b,_a2c);
if(_a2c){
_a2d.unshift(find(_a2b,_a2c));
}
for(var i=0;i<_a2d.length;i++){
_a1f(_a2b,_a2d[i][opts.idField]);
}
}