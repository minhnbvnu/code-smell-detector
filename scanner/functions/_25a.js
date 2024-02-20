function _25a(_25b,_25c){
var opts=$.data(_25b,"panel").options;
var _25d=$.data(_25b,"panel").panel;
var body=_25d.children(".panel-body");
var tool=_25d.children(".panel-header").find("a.panel-tool-collapse");
if(opts.collapsed==false){
return;
}
body.stop(true,true);
if(opts.onBeforeExpand.call(_25b)==false){
return;
}
tool.removeClass("panel-tool-expand");
if(_25c==true){
if(opts.halign=="left"||opts.halign=="right"){
body.show();
_25d.animate({width:opts.panelCssWidth},function(){
cb();
});
}else{
body.slideDown("normal",function(){
cb();
});
}
}else{
if(opts.halign=="left"||opts.halign=="right"){
_25d.css("width",opts.panelCssWidth);
}
cb();
}
function cb(){
body.show();
opts.collapsed=false;
opts.onExpand.call(_25b);
_23b(_25b);
_243(_25b);
};
}