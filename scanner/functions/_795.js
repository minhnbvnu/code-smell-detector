function _795(_7c8,_7c9){
var opts=$.data(_7c8,"datagrid").options;
var _7ca=_7c9?opts.frozenColumns:opts.columns;
var aa=[];
var _7cb=_7cc();
for(var i=0;i<_7ca.length;i++){
aa[i]=new Array(_7cb);
}
for(var _7cd=0;_7cd<_7ca.length;_7cd++){
$.map(_7ca[_7cd],function(col){
var _7ce=_7cf(aa[_7cd]);
if(_7ce>=0){
var _7d0=col.field||col.id||"";
for(var c=0;c<(col.colspan||1);c++){
for(var r=0;r<(col.rowspan||1);r++){
aa[_7cd+r][_7ce]=_7d0;
}
_7ce++;
}
}
});
}
return aa;
function _7cc(){
var _7d1=0;
$.map(_7ca[0]||[],function(col){
_7d1+=col.colspan||1;
});
return _7d1;
};
function _7cf(a){
for(var i=0;i<a.length;i++){
if(a[i]==undefined){
return i;
}
}
return -1;
};
}