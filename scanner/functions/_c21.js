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
}