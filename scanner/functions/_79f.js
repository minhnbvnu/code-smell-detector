function _79f(fit){
var _7ab=dc.header1.add(dc.header2).find(".datagrid-cell-group");
if(_7ab.length){
_7ab.each(function(){
$(this)._outerWidth(fit?$(this).parent().width():10);
});
if(fit){
_70c(_79b);
}
}
}