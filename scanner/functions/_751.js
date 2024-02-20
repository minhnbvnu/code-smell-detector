function _751(_7c5,_7c6){
function find(_7c7){
if(_7c7){
for(var i=0;i<_7c7.length;i++){
var cc=_7c7[i];
for(var j=0;j<cc.length;j++){
var c=cc[j];
if(c.field==_7c6){
return c;
}
}
}
}
return null;
};
var opts=$.data(_7c5,"datagrid").options;
var col=find(opts.columns);
if(!col){
col=find(opts.frozenColumns);
}
return col;
}