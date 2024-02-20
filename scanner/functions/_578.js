function _578(_579){
var _57a=$.data(_579,"textbox");
var tb=_57a.textbox;
tb.find(".textbox-text").validatebox("destroy");
tb.remove();
$(_57a.label).remove();
$(_579).remove();
}