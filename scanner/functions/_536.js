function _536(_537){
var opts=$.data(_537,"validatebox").options;
$(_537).unbind(".validatebox");
if(opts.novalidate||opts.disabled){
return;
}
for(var _538 in opts.events){
$(_537).bind(_538+".validatebox",{target:_537},opts.events[_538]);
}
}