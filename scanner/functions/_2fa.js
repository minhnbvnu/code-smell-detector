function _2fa(_2fb,pp,_2fc){
var opts=$.data(_2fb,"accordion").options;
pp.panel($.extend({},{collapsible:true,minimizable:false,maximizable:false,closable:false,doSize:false,collapsed:true,headerCls:"accordion-header",bodyCls:"accordion-body",halign:opts.halign},_2fc,{onBeforeExpand:function(){
if(_2fc.onBeforeExpand){
if(_2fc.onBeforeExpand.call(this)==false){
return false;
}
}
if(!opts.multiple){
var all=$.grep(_2ea(_2fb),function(p){
return p.panel("options").collapsible;
});
for(var i=0;i<all.length;i++){
_304(_2fb,_2ee(_2fb,all[i]));
}
}
var _2fd=$(this).panel("header");
_2fd.addClass("accordion-header-selected");
_2fd.find(".accordion-collapse").removeClass("accordion-expand");
},onExpand:function(){
$(_2fb).find(">.panel-last>.accordion-header").removeClass("accordion-header-border");
if(_2fc.onExpand){
_2fc.onExpand.call(this);
}
opts.onSelect.call(_2fb,$(this).panel("options").title,_2ee(_2fb,this));
},onBeforeCollapse:function(){
if(_2fc.onBeforeCollapse){
if(_2fc.onBeforeCollapse.call(this)==false){
return false;
}
}
$(_2fb).find(">.panel-last>.accordion-header").addClass("accordion-header-border");
var _2fe=$(this).panel("header");
_2fe.removeClass("accordion-header-selected");
_2fe.find(".accordion-collapse").addClass("accordion-expand");
},onCollapse:function(){
if(isNaN(parseInt(opts.height))){
$(_2fb).find(">.panel-last>.accordion-header").removeClass("accordion-header-border");
}
if(_2fc.onCollapse){
_2fc.onCollapse.call(this);
}
opts.onUnselect.call(_2fb,$(this).panel("options").title,_2ee(_2fb,this));
}}));
var _2ff=pp.panel("header");
var tool=_2ff.children("div.panel-tool");
tool.children("a.panel-tool-collapse").hide();
var t=$("<a href=\"javascript:;\"></a>").addClass("accordion-collapse accordion-expand").appendTo(tool);
t.bind("click",function(){
_300(pp);
return false;
});
pp.panel("options").collapsible?t.show():t.hide();
if(opts.halign=="left"||opts.halign=="right"){
t.hide();
}
_2ff.click(function(){
_300(pp);
return false;
});
function _300(p){
var _301=p.panel("options");
if(_301.collapsible){
var _302=_2ee(_2fb,p);
if(_301.collapsed){
_303(_2fb,_302);
}else{
_304(_2fb,_302);
}
}
};
}