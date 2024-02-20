function _862(_863){
var _864=$.data(_863,"datagrid");
var opts=_864.options;
var _865=_864.originalRows;
var _866=_864.insertedRows;
var _867=_864.deletedRows;
var _868=_864.selectedRows;
var _869=_864.checkedRows;
var data=_864.data;
function _86a(a){
var ids=[];
for(var i=0;i<a.length;i++){
ids.push(a[i][opts.idField]);
}
return ids;
};
function _86b(ids,_86c){
for(var i=0;i<ids.length;i++){
var _86d=_7e3(_863,ids[i]);
if(_86d>=0){
(_86c=="s"?_777:_774)(_863,_86d,true);
}
}
};
for(var i=0;i<data.rows.length;i++){
$(_863).datagrid("cancelEdit",i);
}
var _86e=_86a(_868);
var _86f=_86a(_869);
_868.splice(0,_868.length);
_869.splice(0,_869.length);
data.total+=_867.length-_866.length;
data.rows=_865;
_78e(_863,data);
_86b(_86e,"s");
_86b(_86f,"c");
_85c(_863);
}