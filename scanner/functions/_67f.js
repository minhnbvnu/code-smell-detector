function _67f(_680){
var opts=$.data(_680,"calendar").options;
var menu=$(_680).find(".calendar-menu");
menu.find(".calendar-menu-year").unbind(".calendar").bind("keypress.calendar",function(e){
if(e.keyCode==13){
_681(true);
}
});
$(_680).unbind(".calendar").bind("mouseover.calendar",function(e){
var t=_682(e.target);
if(t.hasClass("calendar-nav")||t.hasClass("calendar-text")||(t.hasClass("calendar-day")&&!t.hasClass("calendar-disabled"))){
t.addClass("calendar-nav-hover");
}
}).bind("mouseout.calendar",function(e){
var t=_682(e.target);
if(t.hasClass("calendar-nav")||t.hasClass("calendar-text")||(t.hasClass("calendar-day")&&!t.hasClass("calendar-disabled"))){
t.removeClass("calendar-nav-hover");
}
}).bind("click.calendar",function(e){
var t=_682(e.target);
if(t.hasClass("calendar-menu-next")||t.hasClass("calendar-nextyear")){
_683(1);
}else{
if(t.hasClass("calendar-menu-prev")||t.hasClass("calendar-prevyear")){
_683(-1);
}else{
if(t.hasClass("calendar-menu-month")){
menu.find(".calendar-selected").removeClass("calendar-selected");
t.addClass("calendar-selected");
_681(true);
}else{
if(t.hasClass("calendar-prevmonth")){
_684(-1);
}else{
if(t.hasClass("calendar-nextmonth")){
_684(1);
}else{
if(t.hasClass("calendar-text")){
if(menu.is(":visible")){
menu.hide();
}else{
_67c(_680);
}
}else{
if(t.hasClass("calendar-day")){
if(t.hasClass("calendar-disabled")){
return;
}
var _685=opts.current;
t.closest("div.calendar-body").find(".calendar-selected").removeClass("calendar-selected");
t.addClass("calendar-selected");
var _686=t.attr("abbr").split(",");
var y=parseInt(_686[0]);
var m=parseInt(_686[1]);
var d=parseInt(_686[2]);
opts.current=new Date(y,m-1,d);
opts.onSelect.call(_680,opts.current);
if(!_685||_685.getTime()!=opts.current.getTime()){
opts.onChange.call(_680,opts.current,_685);
}
if(opts.year!=y||opts.month!=m){
opts.year=y;
opts.month=m;
show(_680);
}
}
}
}
}
}
}
}
});
function _682(t){
var day=$(t).closest(".calendar-day");
if(day.length){
return day;
}else{
return $(t);
}
};
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
};
function _683(_689){
opts.year+=_689;
show(_680);
menu.find(".calendar-menu-year").val(opts.year);
};
function _684(_68a){
opts.month+=_68a;
if(opts.month>12){
opts.year++;
opts.month=1;
}else{
if(opts.month<1){
opts.year--;
opts.month=12;
}
}
show(_680);
menu.find("td.calendar-selected").removeClass("calendar-selected");
menu.find("td:eq("+(opts.month-1)+")").addClass("calendar-selected");
};
}