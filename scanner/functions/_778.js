function _778(_7fd,_7fe,_7ff){
var _800=$.data(_7fd,"datagrid");
var dc=_800.dc;
var opts=_800.options;
var row=opts.finder.getRow(_7fd,_7fe);
if(!row){
return;
}
if(opts.onBeforeUnselect.apply(_7fd,_6f6(_7fd,[_7fe,row]))==false){
return;
}
if(!_7ff&&opts.checkOnSelect){
_775(_7fd,_7fe,true);
}
opts.finder.getTr(_7fd,_7fe).removeClass("datagrid-row-selected");
if(opts.idField){
_6f4(_800.selectedRows,opts.idField,row[opts.idField]);
}
opts.onUnselect.apply(_7fd,_6f6(_7fd,[_7fe,row]));
}