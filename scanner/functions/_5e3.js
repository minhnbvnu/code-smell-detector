function _5e3(_5e4,_5e5){
var opts=$(_5e4).maskedbox("options");
var tt=(_5e5||$(_5e4).maskedbox("getText")||"").split("");
var vv=[];
for(var i=0;i<opts.mask.length;i++){
if(opts.masks[opts.mask[i]]){
var t=tt[i];
vv.push(t!=opts.promptChar?t:" ");
}
}
return vv.join("");
}