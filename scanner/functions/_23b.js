function _23b(_23c,_23d){
var _23e=$.data(_23c,"panel");
var opts=_23e.options;
if(_23f){
opts.queryParams=_23d;
}
if(!opts.href){
return;
}
if(!_23e.isLoaded||!opts.cache){
var _23f=$.extend({},opts.queryParams);
if(opts.onBeforeLoad.call(_23c,_23f)==false){
return;
}
_23e.isLoaded=false;
if(opts.loadingMessage){
$(_23c).panel("clear");
$(_23c).html($("<div class=\"panel-loading\"></div>").html(opts.loadingMessage));
}
opts.loader.call(_23c,_23f,function(data){
var _240=opts.extractor.call(_23c,data);
$(_23c).panel("clear");
$(_23c).html(_240);
$.parser.parse($(_23c));
opts.onLoad.apply(_23c,arguments);
_23e.isLoaded=true;
},function(){
opts.onLoadError.apply(_23c,arguments);
});
}
}