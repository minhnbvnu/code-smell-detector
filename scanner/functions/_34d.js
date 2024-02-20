function _34d(_34e){
var opts=$.data(_34e,"tabs").options;
var tab=_34f(_34e);
if(tab){
var _350=$(_34e).children("div.tabs-panels");
var _351=opts.width=="auto"?"auto":_350.width();
var _352=opts.height=="auto"?"auto":_350.height();
tab.panel("resize",{width:_351,height:_352});
}
}