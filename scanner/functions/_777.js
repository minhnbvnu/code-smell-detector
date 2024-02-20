function _777(_7f7,_7f8,_7f9,_7fa){
var _7fb=$.data(_7f7,"datagrid");
var opts=_7fb.options;
var row=opts.finder.getRow(_7f7,_7f8);
if(!row){
return;
}
if(opts.onBeforeSelect.apply(_7f7,_6f6(_7f7,[_7f8,row]))==false){
return;
}
if(opts.singleSelect){
_7fc(_7f7,true);
_7fb.selectedRows=[];
}
if(!_7f9&&opts.checkOnSelect){
_774(_7f7,_7f8,true);
}
if(opts.idField){
_6f5(_7fb.selectedRows,opts.idField,row);
}
opts.finder.getTr(_7f7,_7f8).addClass("datagrid-row-selected");
opts.onSelect.apply(_7f7,_6f6(_7f7,[_7f8,row]));
if(!_7fa&&opts.scrollOnSelect){
_7ec(_7f7,_7f8);
}
}