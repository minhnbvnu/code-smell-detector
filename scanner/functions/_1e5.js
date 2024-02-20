function _1e5(_1e6,_1e7){
var opts=$.data(_1e6,"progressbar").options;
var bar=$.data(_1e6,"progressbar").bar;
if(_1e7){
opts.width=_1e7;
}
bar._size(opts);
bar.find("div.progressbar-text").css("width",bar.width());
bar.find("div.progressbar-text,div.progressbar-value").css({height:bar.height()+"px",lineHeight:bar.height()+"px"});
}