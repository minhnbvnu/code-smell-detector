function _a96(rows){
rows.sort(function(r1,r2){
var r=0;
for(var i=0;i<_a94.length;i++){
var sn=_a94[i];
var so=_a95[i];
var col=$(_a93).treegrid("getColumnOption",sn);
var _a97=col.sorter||function(a,b){
return a==b?0:(a>b?1:-1);
};
r=_a97(r1[sn],r2[sn])*(so=="asc"?1:-1);
if(r!=0){
return r;
}
}
return r;
});
for(var i=0;i<rows.length;i++){
var _a98=rows[i].children;
if(_a98&&_a98.length){
_a96(_a98);
}
}
}