function _c80(_c81){
var _c82=$.data(_c81,"datetimebox");
var opts=_c82.options;
$(_c81).datebox($.extend({},opts,{onShowPanel:function(){
var _c83=$(this).datetimebox("getValue");
_c89(this,_c83,true);
opts.onShowPanel.call(this);
},formatter:$.fn.datebox.defaults.formatter,parser:$.fn.datebox.defaults.parser}));
$(_c81).removeClass("datebox-f").addClass("datetimebox-f");
$(_c81).datebox("calendar").calendar({onSelect:function(date){
opts.onSelect.call(this.target,date);
}});
if(!_c82.spinner){
var _c84=$(_c81).datebox("panel");
var p=$("<div style=\"padding:2px\"><input></div>").insertAfter(_c84.children("div.datebox-calendar-inner"));
_c82.spinner=p.children("input");
}
_c82.spinner.timespinner({width:opts.spinnerWidth,showSeconds:opts.showSeconds,separator:opts.timeSeparator,hour12:opts.hour12});
$(_c81).datetimebox("initValue",opts.value);
}