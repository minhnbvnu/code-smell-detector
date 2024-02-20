function _b3e(_b3f,url,_b40,_b41){
var opts=$.data(_b3f,"combobox").options;
if(url){
opts.url=url;
}
_b40=$.extend({},opts.queryParams,_b40||{});
if(opts.onBeforeLoad.call(_b3f,_b40)==false){
return;
}
opts.loader.call(_b3f,_b40,function(data){
_b3a(_b3f,data,_b41);
},function(){
opts.onLoadError.apply(this,arguments);
});
}