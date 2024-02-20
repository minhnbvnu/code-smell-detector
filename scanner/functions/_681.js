function _681(_687){
var menu=$(_680).find(".calendar-menu");
var year=menu.find(".calendar-menu-year").val();
var _688=menu.find(".calendar-selected").attr("abbr");
if(!isNaN(year)){
opts.year=parseInt(year);
opts.month=parseInt(_688);
show(_680);
}
if(_687){
menu.hide();
}
}