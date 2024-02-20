function _cba(_cbb){
var dd=String(opts.step).split(".");
var dlen=dd.length>1?dd[1].length:0;
return parseFloat(_cbb.toFixed(dlen));
}