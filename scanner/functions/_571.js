function _571(_572){
var _573=$.data(_572,"textbox");
var opts=_573.options;
var tb=_573.textbox;
var _574="_easyui_textbox_input"+(++_56f);
tb.addClass(opts.cls);
tb.find(".textbox-text").remove();
if(opts.multiline){
$("<textarea id=\""+_574+"\" class=\"textbox-text\" autocomplete=\"off\"></textarea>").prependTo(tb);
}else{
$("<input id=\""+_574+"\" type=\""+opts.type+"\" class=\"textbox-text\" autocomplete=\"off\">").prependTo(tb);
}
$("#"+_574).attr("tabindex",$(_572).attr("tabindex")||"").css("text-align",_572.style.textAlign||"");
tb.find(".textbox-addon").remove();
var bb=opts.icons?$.extend(true,[],opts.icons):[];
if(opts.iconCls){
bb.push({iconCls:opts.iconCls,disabled:true});
}
if(bb.length){
var bc=$("<span class=\"textbox-addon\"></span>").prependTo(tb);
bc.addClass("textbox-addon-"+opts.iconAlign);
for(var i=0;i<bb.length;i++){
bc.append("<a href=\"javascript:;\" class=\"textbox-icon "+bb[i].iconCls+"\" icon-index=\""+i+"\" tabindex=\"-1\"></a>");
}
}
tb.find(".textbox-button").remove();
if(opts.buttonText||opts.buttonIcon){
var btn=$("<a href=\"javascript:;\" class=\"textbox-button\"></a>").prependTo(tb);
btn.addClass("textbox-button-"+opts.buttonAlign).linkbutton({text:opts.buttonText,iconCls:opts.buttonIcon,onClick:function(){
var t=$(this).parent().prev();
t.textbox("options").onClickButton.call(t[0]);
}});
}
if(opts.label){
if(typeof opts.label=="object"){
_573.label=$(opts.label);
_573.label.attr("for",_574);
}else{
$(_573.label).remove();
_573.label=$("<label class=\"textbox-label\"></label>").html(opts.label);
_573.label.css("textAlign",opts.labelAlign).attr("for",_574);
if(opts.labelPosition=="after"){
_573.label.insertAfter(tb);
}else{
_573.label.insertBefore(_572);
}
_573.label.removeClass("textbox-label-left textbox-label-right textbox-label-top");
_573.label.addClass("textbox-label-"+opts.labelPosition);
}
}else{
$(_573.label).remove();
}
_575(_572);
_576(_572,opts.disabled);
_577(_572,opts.readonly);
}