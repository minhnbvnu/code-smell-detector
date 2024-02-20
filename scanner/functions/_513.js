function _513(_514){
var _515=$.data(_514,"checkbox");
var opts=_515.options;
var _516=_515.checkbox;
var _517="_easyui_checkbox_"+(++_510);
_516.find(".checkbox-value").attr("id",_517);
if(opts.label){
if(typeof opts.label=="object"){
_515.label=$(opts.label);
_515.label.attr("for",_517);
}else{
$(_515.label).remove();
_515.label=$("<label class=\"textbox-label\"></label>").html(opts.label);
_515.label.css("textAlign",opts.labelAlign).attr("for",_517);
if(opts.labelPosition=="after"){
_515.label.insertAfter(_516);
}else{
_515.label.insertBefore(_514);
}
_515.label.removeClass("textbox-label-left textbox-label-right textbox-label-top");
_515.label.addClass("textbox-label-"+opts.labelPosition);
}
}else{
$(_515.label).remove();
}
$(_514).checkbox("setValue",opts.value);
_518(_514,opts.checked);
_519(_514,opts.disabled);
}