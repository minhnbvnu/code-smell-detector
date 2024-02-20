function _c01(_c02,_c03){
var _c04=$.data(_c02,"combotreegrid");
var opts=_c04.options;
var grid=_c04.grid;
if(!$.isArray(_c03)){
_c03=_c03.split(opts.separator);
}
if(!opts.multiple){
_c03=_c03.length?[_c03[0]]:[""];
}
var vv=$.map(_c03,function(_c05){
return String(_c05);
});
vv=$.grep(vv,function(v,_c06){
return _c06===$.inArray(v,vv);
});
var _c07=grid.treegrid("getSelected");
if(_c07){
grid.treegrid("unselect",_c07[opts.idField]);
}
$.map(grid.treegrid("getCheckedNodes"),function(row){
if($.inArray(String(row[opts.idField]),vv)==-1){
grid.treegrid("uncheckNode",row[opts.idField]);
}
});
var ss=[];
opts.unselectedValues=[];
$.map(vv,function(v){
var row=grid.treegrid("find",v);
if(row){
if(opts.multiple){
grid.treegrid("checkNode",v);
}else{
grid.treegrid("select",v);
}
ss.push(_c08(row));
}else{
ss.push(_c09(v,opts.mappingRows)||v);
opts.unselectedValues.push(v);
}
});
if(opts.multiple){
$.map(grid.treegrid("getCheckedNodes"),function(row){
var id=String(row[opts.idField]);
if($.inArray(id,vv)==-1){
vv.push(id);
ss.push(_c08(row));
}
});
}
if(!_c04.remainText){
var s=ss.join(opts.separator);
if($(_c02).combo("getText")!=s){
$(_c02).combo("setText",s);
}
}
$(_c02).combo("setValues",vv);
function _c09(_c0a,a){
var item=$.easyui.getArrayItem(a,opts.idField,_c0a);
return item?_c08(item):undefined;
};
function _c08(row){
return row[opts.textField||""]||row[opts.treeField];
};
}