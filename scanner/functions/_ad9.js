function _ad9(_ada){
var _adb=$.data(_ada,"combo");
var opts=_adb.options;
var p=_adb.panel;
if(p.is(":visible")){
p.panel("close");
}
if(!opts.cloned){
p.panel("destroy");
}
$(_ada).textbox("destroy");
}