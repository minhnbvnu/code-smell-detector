function _7ec(_7ed,_7ee){
var _7ef=$.data(_7ed,"datagrid");
var dc=_7ef.dc;
var opts=_7ef.options;
var tr=opts.finder.getTr(_7ed,_7ee);
if(tr.length){
if(tr.closest("table").hasClass("datagrid-btable-frozen")){
return;
}
var _7f0=dc.view2.children("div.datagrid-header")._outerHeight();
var _7f1=dc.body2;
var _7f2=opts.scrollbarSize;
if(_7f1[0].offsetHeight&&_7f1[0].clientHeight&&_7f1[0].offsetHeight<=_7f1[0].clientHeight){
_7f2=0;
}
var _7f3=_7f1.outerHeight(true)-_7f1.outerHeight();
var top=tr.offset().top-dc.view2.offset().top-_7f0-_7f3;
if(top<0){
_7f1.scrollTop(_7f1.scrollTop()+top);
}else{
if(top+tr._outerHeight()>_7f1.height()-_7f2){
_7f1.scrollTop(_7f1.scrollTop()+top+tr._outerHeight()-_7f1.height()+_7f2);
}
}
}
}