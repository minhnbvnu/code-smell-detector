function _820(_840,_841){
var tr=$.data(_840,"datagrid").options.finder.getTr(_840,_841);
if(!tr.hasClass("datagrid-row-editing")){
return true;
}
var vbox=tr.find(".validatebox-text");
vbox.validatebox("validate");
vbox.trigger("mouseleave");
var _842=tr.find(".validatebox-invalid");
return _842.length==0;
}