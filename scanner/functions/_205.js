function _205(_206,e){
var _207=$.data(_206,"tooltip");
if(_207&&_207.tip){
_1f5(_206);
_207.hideTimer=setTimeout(function(){
_207.tip.hide();
_207.options.onHide.call(_206,e);
},_207.options.hideDelay);
}
}