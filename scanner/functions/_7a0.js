function _7a0(){
var _7a7=false;
var _7a8=_750(_79b,true).concat(_750(_79b,false));
$.map(_7a8,function(_7a9){
var col=_751(_79b,_7a9);
if(String(col.width||"").indexOf("%")>=0){
var _7aa=$.parser.parseValue("width",col.width,dc.view,opts.scrollbarSize+(opts.rownumbers?opts.rownumberWidth:0))-col.deltaWidth;
if(_7aa>0){
col.boxWidth=_7aa;
_7a7=true;
}
}
});
if(_7a7){
$(_79b).datagrid("fixColumnSize");
}
}