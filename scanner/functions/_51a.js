function _51a(_51b){
var _51c=$.data(_51b,"checkbox");
var opts=_51c.options;
var _51d=_51c.checkbox;
_51d.unbind(".checkbox").bind("click.checkbox",function(){
if(!opts.disabled){
_518(_51b,!opts.checked);
}
});
}