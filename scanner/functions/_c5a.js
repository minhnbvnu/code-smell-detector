function _c5a(_c63){
var _c64=$(_c63).combo("panel");
var cc=_c64.children("div.datebox-calendar-inner");
_c64.children()._outerWidth(_c64.width());
_c57.calendar.appendTo(cc);
_c57.calendar[0].target=_c63;
if(opts.panelHeight!="auto"){
var _c65=_c64.height();
_c64.children().not(cc).each(function(){
_c65-=$(this).outerHeight();
});
cc._outerHeight(_c65);
}
_c57.calendar.calendar("resize");
}