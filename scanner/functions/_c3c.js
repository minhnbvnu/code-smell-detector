function _c3c(val){
var s=val.replace(/&/g,"&amp;").replace(/\s/g," ").replace(/</g,"&lt;").replace(/>/g,"&gt;");
tmp.html(s);
return tmp.outerWidth();
}