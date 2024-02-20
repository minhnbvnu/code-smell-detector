function _ad0(_ad1){
var _ad2=$.data(_ad1,"combo");
var opts=_ad2.options;
if(!_ad2.panel){
_ad2.panel=$("<div class=\"combo-panel\"></div>").appendTo("body");
_ad2.panel.panel({minWidth:opts.panelMinWidth,maxWidth:opts.panelMaxWidth,minHeight:opts.panelMinHeight,maxHeight:opts.panelMaxHeight,doSize:false,closed:true,cls:"combo-p",style:{position:"absolute",zIndex:10},onOpen:function(){
var _ad3=$(this).panel("options").comboTarget;
var _ad4=$.data(_ad3,"combo");
if(_ad4){
_ad4.options.onShowPanel.call(_ad3);
}
},onBeforeClose:function(){
_acf($(this).parent());
},onClose:function(){
var _ad5=$(this).panel("options").comboTarget;
var _ad6=$(_ad5).data("combo");
if(_ad6){
_ad6.options.onHidePanel.call(_ad5);
}
}});
}
var _ad7=$.extend(true,[],opts.icons);
if(opts.hasDownArrow){
_ad7.push({iconCls:"combo-arrow",handler:function(e){
_adc(e.data.target);
}});
}
$(_ad1).addClass("combo-f").textbox($.extend({},opts,{icons:_ad7,onChange:function(){
}}));
$(_ad1).attr("comboName",$(_ad1).attr("textboxName"));
_ad2.combo=$(_ad1).next();
_ad2.combo.addClass("combo");
_ad2.panel.unbind(".combo");
for(var _ad8 in opts.panelEvents){
_ad2.panel.bind(_ad8+".combo",{target:_ad1},opts.panelEvents[_ad8]);
}
}