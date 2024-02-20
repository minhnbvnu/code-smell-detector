function _c38(_c39){
var opts=$(_c39).tagbox("options");
var _c3a=$(_c39).tagbox("textbox");
var span=$(_c39).next();
var tmp=$("<span></span>").appendTo("body");
tmp.attr("style",_c3a.attr("style"));
tmp.css({position:"absolute",top:-9999,left:-9999,width:"auto",fontFamily:_c3a.css("fontFamily"),fontSize:_c3a.css("fontSize"),fontWeight:_c3a.css("fontWeight"),whiteSpace:"nowrap"});
var _c3b=_c3c(_c3a.val());
var _c3d=_c3c(opts.prompt||"");
tmp.remove();
var _c3e=Math.min(Math.max(_c3b,_c3d)+20,span.width());
_c3a._outerWidth(_c3e);
span.find(".textbox-button").linkbutton("resize",{height:"100%"});
function _c3c(val){
var s=val.replace(/&/g,"&amp;").replace(/\s/g," ").replace(/</g,"&lt;").replace(/>/g,"&gt;");
tmp.html(s);
return tmp.outerWidth();
};
}