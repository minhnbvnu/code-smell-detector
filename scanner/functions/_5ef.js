function _5ef(_5f9,pos){
var opts=$(_5f9).maskedbox("options");
var _5fa=0;
if(pos>=opts.mask.length){
pos--;
}
for(var i=pos;i>=0;i--){
if(opts.masks[opts.mask[i]]==undefined){
_5fa++;
}
}
return _5fa;
}