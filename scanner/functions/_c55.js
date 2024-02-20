function _c55(_c56){
var _c57=$.data(_c56,"datebox");
var opts=_c57.options;
$(_c56).addClass("datebox-f").combo($.extend({},opts,{onShowPanel:function(){
_c58(this);
_c59(this);
_c5a(this);
_c68(this,$(this).datebox("getText"),true);
opts.onShowPanel.call(this);
}}));
if(!_c57.calendar){
var _c5b=$(_c56).combo("panel").css("overflow","hidden");
_c5b.panel("options").onBeforeDestroy=function(){
var c=$(this).find(".calendar-shared");
if(c.length){
c.insertBefore(c[0].pholder);
}
};
var cc=$("<div class=\"datebox-calendar-inner\"></div>").prependTo(_c5b);
if(opts.sharedCalendar){
var c=$(opts.sharedCalendar);
if(!c[0].pholder){
c[0].pholder=$("<div class=\"calendar-pholder\" style=\"display:none\"></div>").insertAfter(c);
}
c.addClass("calendar-shared").appendTo(cc);
if(!c.hasClass("calendar")){
c.calendar();
}
_c57.calendar=c;
}else{
_c57.calendar=$("<div></div>").appendTo(cc).calendar();
}
$.extend(_c57.calendar.calendar("options"),{fit:true,border:false,onSelect:function(date){
var _c5c=this.target;
var opts=$(_c5c).datebox("options");
opts.onSelect.call(_c5c,date);
_c68(_c5c,opts.formatter.call(_c5c,date));
$(_c5c).combo("hidePanel");
}});
}
$(_c56).combo("textbox").parent().addClass("datebox");
$(_c56).datebox("initValue",opts.value);
function _c58(_c5d){
var opts=$(_c5d).datebox("options");
var _c5e=$(_c5d).combo("panel");
_c5e.unbind(".datebox").bind("click.datebox",function(e){
if($(e.target).hasClass("datebox-button-a")){
var _c5f=parseInt($(e.target).attr("datebox-button-index"));
opts.buttons[_c5f].handler.call(e.target,_c5d);
}
});
};
function _c59(_c60){
var _c61=$(_c60).combo("panel");
if(_c61.children("div.datebox-button").length){
return;
}
var _c62=$("<div class=\"datebox-button\"><table cellspacing=\"0\" cellpadding=\"0\" style=\"width:100%\"><tr></tr></table></div>").appendTo(_c61);
var tr=_c62.find("tr");
for(var i=0;i<opts.buttons.length;i++){
var td=$("<td></td>").appendTo(tr);
var btn=opts.buttons[i];
var t=$("<a class=\"datebox-button-a\" href=\"javascript:;\"></a>").html($.isFunction(btn.text)?btn.text(_c60):btn.text).appendTo(td);
t.attr("datebox-button-index",i);
}
tr.find("td").css("width",(100/opts.buttons.length)+"%");
};
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
};
}