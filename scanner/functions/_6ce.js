function _6ce(e){
var _6cf=e.data.target;
var opts=$.data(_6cf,"timespinner").options;
var _6d0=$(_6cf).timespinner("getSelectionStart");
for(var i=0;i<opts.selections.length;i++){
var _6d1=opts.selections[i];
if(_6d0>=_6d1[0]&&_6d0<=_6d1[1]){
_6d2(_6cf,i);
return;
}
}
}