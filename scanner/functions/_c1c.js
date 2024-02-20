function _c1c(_c1d){
var _c1e=$.data(_c1d,"tagbox");
var opts=_c1e.options;
$(_c1d).addClass("tagbox-f").combobox($.extend({},opts,{cls:"tagbox",reversed:true,onChange:function(_c1f,_c20){
_c21();
$(this).combobox("hidePanel");
opts.onChange.call(_c1d,_c1f,_c20);
},onResizing:function(_c22,_c23){
var _c24=$(this).combobox("textbox");
var tb=$(this).data("textbox").textbox;
var _c25=tb.outerWidth();
tb.css({height:"",paddingLeft:_c24.css("marginLeft"),paddingRight:_c24.css("marginRight")});
_c24.css("margin",0);
tb._outerWidth(_c25);
_c38(_c1d);
_c2a(this);
opts.onResizing.call(_c1d,_c22,_c23);
},onLoadSuccess:function(data){
_c21();
opts.onLoadSuccess.call(_c1d,data);
}}));
_c21();
_c38(_c1d);
function _c21(){
$(_c1d).next().find(".tagbox-label").remove();
var _c26=$(_c1d).tagbox("textbox");
var ss=[];
$.map($(_c1d).tagbox("getValues"),function(_c27,_c28){
var row=opts.finder.getRow(_c1d,_c27);
var text=opts.tagFormatter.call(_c1d,_c27,row);
var cs={};
var css=opts.tagStyler.call(_c1d,_c27,row)||"";
if(typeof css=="string"){
cs={s:css};
}else{
cs={c:css["class"]||"",s:css["style"]||""};
}
var _c29=$("<span class=\"tagbox-label\"></span>").insertBefore(_c26).html(text);
_c29.attr("tagbox-index",_c28);
_c29.attr("style",cs.s).addClass(cs.c);
$("<a href=\"javascript:;\" class=\"tagbox-remove\"></a>").appendTo(_c29);
});
_c2a(_c1d);
$(_c1d).combobox("setText","");
};
}