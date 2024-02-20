function _67c(_68b){
var opts=$.data(_68b,"calendar").options;
$(_68b).find(".calendar-menu").show();
if($(_68b).find(".calendar-menu-month-inner").is(":empty")){
$(_68b).find(".calendar-menu-month-inner").empty();
var t=$("<table class=\"calendar-mtable\"></table>").appendTo($(_68b).find(".calendar-menu-month-inner"));
var idx=0;
for(var i=0;i<3;i++){
var tr=$("<tr></tr>").appendTo(t);
for(var j=0;j<4;j++){
$("<td class=\"calendar-nav calendar-menu-month\"></td>").html(opts.months[idx++]).attr("abbr",idx).appendTo(tr);
}
}
}
var body=$(_68b).find(".calendar-body");
var sele=$(_68b).find(".calendar-menu");
var _68c=sele.find(".calendar-menu-year-inner");
var _68d=sele.find(".calendar-menu-month-inner");
_68c.find("input").val(opts.year).focus();
_68d.find("td.calendar-selected").removeClass("calendar-selected");
_68d.find("td:eq("+(opts.month-1)+")").addClass("calendar-selected");
sele._outerWidth(body._outerWidth());
sele._outerHeight(body._outerHeight());
_68d._outerHeight(sele.height()-_68c._outerHeight());
}