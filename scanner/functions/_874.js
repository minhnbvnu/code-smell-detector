function _874(_875,_876){
var opts=$.data(_875,"datagrid").options;
_876.type=_876.type||"body";
_876.rowspan=_876.rowspan||1;
_876.colspan=_876.colspan||1;
if(_876.rowspan==1&&_876.colspan==1){
return;
}
var tr=opts.finder.getTr(_875,(_876.index!=undefined?_876.index:_876.id),_876.type);
if(!tr.length){
return;
}
var td=tr.find("td[field=\""+_876.field+"\"]");
td.attr("rowspan",_876.rowspan).attr("colspan",_876.colspan);
td.addClass("datagrid-td-merged");
_877(td.next(),_876.colspan-1);
for(var i=1;i<_876.rowspan;i++){
tr=tr.next();
if(!tr.length){
break;
}
_877(tr.find("td[field=\""+_876.field+"\"]"),_876.colspan);
}
_7bd(_875,td);
function _877(td,_878){
for(var i=0;i<_878;i++){
td.hide();
td=td.next();
}
};
}