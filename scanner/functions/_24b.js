function _24b(_256,_257){
var opts=$.data(_256,"panel").options;
var _258=$.data(_256,"panel").panel;
var body=_258.children(".panel-body");
var _259=_258.children(".panel-header");
var tool=_259.find("a.panel-tool-collapse");
if(opts.collapsed==true){
return;
}
body.stop(true,true);
if(opts.onBeforeCollapse.call(_256)==false){
return;
}
tool.addClass("panel-tool-expand");
if(_257==true){
if(opts.halign=="left"||opts.halign=="right"){
_258.animate({width:_259._outerWidth()+_258.children(".panel-footer")._outerWidth()},function(){
cb();
});
}else{
body.slideUp("normal",function(){
cb();
});
}
}else{
if(opts.halign=="left"||opts.halign=="right"){
_258._outerWidth(_259._outerWidth()+_258.children(".panel-footer")._outerWidth());
}
cb();
}
function cb(){
body.hide();
opts.collapsed=true;
opts.onCollapse.call(_256);
};
}