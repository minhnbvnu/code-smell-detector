function _4e4(_4e5){
var _4e6=$.data(_4e5,"switchbutton");
var opts=_4e6.options;
_4e6.switchbutton.unbind(".switchbutton").bind("click.switchbutton",function(){
if(!opts.disabled&&!opts.readonly){
_4cc(_4e5,opts.checked?false:true,true);
}
});
}