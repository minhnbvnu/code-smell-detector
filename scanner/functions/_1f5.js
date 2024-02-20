function _1f5(_1f6){
var _1f7=$.data(_1f6,"tooltip");
if(_1f7.showTimer){
clearTimeout(_1f7.showTimer);
_1f7.showTimer=null;
}
if(_1f7.hideTimer){
clearTimeout(_1f7.hideTimer);
_1f7.hideTimer=null;
}
}