function _2f5(_2f6){
var opts=$.data(_2f6,"accordion").options;
var cc=$(_2f6);
if(opts.border){
cc.removeClass("accordion-noborder");
}else{
cc.addClass("accordion-noborder");
}
}