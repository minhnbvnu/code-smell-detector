function _62f(_631,_632){
var opts=$.data(_631,"form").options;
var _633="easyui_frame_"+(new Date().getTime());
var _634=$("<iframe id="+_633+" name="+_633+"></iframe>").appendTo("body");
_634.attr("src",window.ActiveXObject?"javascript:false":"about:blank");
_634.css({position:"absolute",top:-1000,left:-1000});
_634.bind("load",cb);
_635(_632);
function _635(_636){
var form=$(_631);
if(opts.url){
form.attr("action",opts.url);
}
var t=form.attr("target"),a=form.attr("action");
form.attr("target",_633);
var _637=$();
try{
for(var n in _636){
var _638=$("<input type=\"hidden\" name=\""+n+"\">").val(_636[n]).appendTo(form);
_637=_637.add(_638);
}
_639();
form[0].submit();
}
finally{
form.attr("action",a);
t?form.attr("target",t):form.removeAttr("target");
_637.remove();
}
};
function _639(){
var f=$("#"+_633);
if(!f.length){
return;
}
try{
var s=f.contents()[0].readyState;
if(s&&s.toLowerCase()=="uninitialized"){
setTimeout(_639,100);
}
}
catch(e){
cb();
}
};
var _63a=10;
function cb(){
var f=$("#"+_633);
if(!f.length){
return;
}
f.unbind();
var data="";
try{
var body=f.contents().find("body");
data=body.html();
if(data==""){
if(--_63a){
setTimeout(cb,100);
return;
}
}
var ta=body.find(">textarea");
if(ta.length){
data=ta.val();
}else{
var pre=body.find(">pre");
if(pre.length){
data=pre.html();
}
}
}
catch(e){
}
opts.success.call(_631,data);
setTimeout(function(){
f.unbind();
f.remove();
},100);
};
}