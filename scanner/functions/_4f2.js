function _4f2(_4f3){
var _4f4=$.data(_4f3,"radiobutton");
var opts=_4f4.options;
var _4f5=_4f4.radiobutton;
var _4f6="_easyui_radiobutton_"+(++_4ef);
_4f5.find(".radiobutton-value").attr("id",_4f6);
if(opts.label){
if(typeof opts.label=="object"){
_4f4.label=$(opts.label);
_4f4.label.attr("for",_4f6);
}else{
$(_4f4.label).remove();
_4f4.label=$("<label class=\"textbox-label\"></label>").html(opts.label);
_4f4.label.css("textAlign",opts.labelAlign).attr("for",_4f6);
if(opts.labelPosition=="after"){
_4f4.label.insertAfter(_4f5);
}else{
_4f4.label.insertBefore(_4f3);
}
_4f4.label.removeClass("textbox-label-left textbox-label-right textbox-label-top");
_4f4.label.addClass("textbox-label-"+opts.labelPosition);
}
}else{
$(_4f4.label).remove();
}
$(_4f3).radiobutton("setValue",opts.value);
_4f7(_4f3,opts.checked);
_4f8(_4f3,opts.disabled);
}