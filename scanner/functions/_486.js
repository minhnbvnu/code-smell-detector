function _486(_487,_488,data){
var opts=$(_487).sidemenu("options");
$(_488).tooltip({content:$("<div></div>"),position:opts.floatMenuPosition,valign:"top",data:data,onUpdate:function(_489){
var _48a=$(this).tooltip("options");
var data=_48a.data;
_489.accordion({width:opts.floatMenuWidth,multiple:false}).accordion("add",{title:data.text,collapsed:false,collapsible:false});
_482(_487,_489.accordion("panels")[0],data.children);
},onShow:function(){
var t=$(this);
var tip=t.tooltip("tip").addClass("sidemenu-tooltip");
tip.children(".tooltip-content").addClass("sidemenu");
tip.find(".accordion").accordion("resize");
tip.add(tip.find("ul.tree")).unbind(".sidemenu").bind("mouseover.sidemenu",function(){
t.tooltip("show");
}).bind("mouseleave.sidemenu",function(){
t.tooltip("hide");
});
t.tooltip("reposition");
},onPosition:function(left,top){
var tip=$(this).tooltip("tip");
if(!opts.collapsed){
tip.css({left:-999999});
}else{
if(top+tip.outerHeight()>$(window)._outerHeight()+$(document).scrollTop()){
top=$(window)._outerHeight()+$(document).scrollTop()-tip.outerHeight();
tip.css("top",top);
}
}
}});
}