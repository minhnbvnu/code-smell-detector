function _35e(_35f){
var opts=$.data(_35f,"tabs").options;
var _360=$(_35f).children("div.tabs-header");
var _361=$(_35f).children("div.tabs-panels");
_360.removeClass("tabs-header-top tabs-header-bottom tabs-header-left tabs-header-right");
_361.removeClass("tabs-panels-top tabs-panels-bottom tabs-panels-left tabs-panels-right");
if(opts.tabPosition=="top"){
_360.insertBefore(_361);
}else{
if(opts.tabPosition=="bottom"){
_360.insertAfter(_361);
_360.addClass("tabs-header-bottom");
_361.addClass("tabs-panels-top");
}else{
if(opts.tabPosition=="left"){
_360.addClass("tabs-header-left");
_361.addClass("tabs-panels-right");
}else{
if(opts.tabPosition=="right"){
_360.addClass("tabs-header-right");
_361.addClass("tabs-panels-left");
}
}
}
}
if(opts.plain==true){
_360.addClass("tabs-header-plain");
}else{
_360.removeClass("tabs-header-plain");
}
_360.removeClass("tabs-header-narrow").addClass(opts.narrow?"tabs-header-narrow":"");
var tabs=_360.find(".tabs");
tabs.removeClass("tabs-pill").addClass(opts.pill?"tabs-pill":"");
tabs.removeClass("tabs-narrow").addClass(opts.narrow?"tabs-narrow":"");
tabs.removeClass("tabs-justified").addClass(opts.justified?"tabs-justified":"");
if(opts.border==true){
_360.removeClass("tabs-header-noborder");
_361.removeClass("tabs-panels-noborder");
}else{
_360.addClass("tabs-header-noborder");
_361.addClass("tabs-panels-noborder");
}
opts.doSize=true;
}