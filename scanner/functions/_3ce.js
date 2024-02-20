function _3ce(_3cf,_3d0,el){
_3d0.region=_3d0.region||"center";
var _3d1=$.data(_3cf,"layout").panels;
var cc=$(_3cf);
var dir=_3d0.region;
if(_3d1[dir].length){
return;
}
var pp=$(el);
if(!pp.length){
pp=$("<div></div>").appendTo(cc);
}
var _3d2=$.extend({},$.fn.layout.paneldefaults,{width:(pp.length?parseInt(pp[0].style.width)||pp.outerWidth():"auto"),height:(pp.length?parseInt(pp[0].style.height)||pp.outerHeight():"auto"),doSize:false,collapsible:true,onOpen:function(){
var tool=$(this).panel("header").children("div.panel-tool");
tool.children("a.panel-tool-collapse").hide();
var _3d3={north:"up",south:"down",east:"right",west:"left"};
if(!_3d3[dir]){
return;
}
var _3d4="layout-button-"+_3d3[dir];
var t=tool.children("a."+_3d4);
if(!t.length){
t=$("<a href=\"javascript:;\"></a>").addClass(_3d4).appendTo(tool);
t.bind("click",{dir:dir},function(e){
_3eb(_3cf,e.data.dir);
return false;
});
}
$(this).panel("options").collapsible?t.show():t.hide();
}},_3d0,{cls:((_3d0.cls||"")+" layout-panel layout-panel-"+dir),bodyCls:((_3d0.bodyCls||"")+" layout-body")});
pp.panel(_3d2);
_3d1[dir]=pp;
var _3d5={north:"s",south:"n",east:"w",west:"e"};
var _3d6=pp.panel("panel");
if(pp.panel("options").split){
_3d6.addClass("layout-split-"+dir);
}
_3d6.resizable($.extend({},{handles:(_3d5[dir]||""),disabled:(!pp.panel("options").split),onStartResize:function(e){
_3be=true;
if(dir=="north"||dir=="south"){
var _3d7=$(">div.layout-split-proxy-v",_3cf);
}else{
var _3d7=$(">div.layout-split-proxy-h",_3cf);
}
var top=0,left=0,_3d8=0,_3d9=0;
var pos={display:"block"};
if(dir=="north"){
pos.top=parseInt(_3d6.css("top"))+_3d6.outerHeight()-_3d7.height();
pos.left=parseInt(_3d6.css("left"));
pos.width=_3d6.outerWidth();
pos.height=_3d7.height();
}else{
if(dir=="south"){
pos.top=parseInt(_3d6.css("top"));
pos.left=parseInt(_3d6.css("left"));
pos.width=_3d6.outerWidth();
pos.height=_3d7.height();
}else{
if(dir=="east"){
pos.top=parseInt(_3d6.css("top"))||0;
pos.left=parseInt(_3d6.css("left"))||0;
pos.width=_3d7.width();
pos.height=_3d6.outerHeight();
}else{
if(dir=="west"){
pos.top=parseInt(_3d6.css("top"))||0;
pos.left=_3d6.outerWidth()-_3d7.width();
pos.width=_3d7.width();
pos.height=_3d6.outerHeight();
}
}
}
}
_3d7.css(pos);
$("<div class=\"layout-mask\"></div>").css({left:0,top:0,width:cc.width(),height:cc.height()}).appendTo(cc);
},onResize:function(e){
if(dir=="north"||dir=="south"){
var _3da=_3db(this);
$(this).resizable("options").maxHeight=_3da;
var _3dc=$(">div.layout-split-proxy-v",_3cf);
var top=dir=="north"?e.data.height-_3dc.height():$(_3cf).height()-e.data.height;
_3dc.css("top",top);
}else{
var _3dd=_3db(this);
$(this).resizable("options").maxWidth=_3dd;
var _3dc=$(">div.layout-split-proxy-h",_3cf);
var left=dir=="west"?e.data.width-_3dc.width():$(_3cf).width()-e.data.width;
_3dc.css("left",left);
}
return false;
},onStopResize:function(e){
cc.children("div.layout-split-proxy-v,div.layout-split-proxy-h").hide();
pp.panel("resize",e.data);
_3bf(_3cf);
_3be=false;
cc.find(">div.layout-mask").remove();
}},_3d0));
cc.layout("options").onAdd.call(_3cf,dir);
function _3db(p){
var _3de="expand"+dir.substring(0,1).toUpperCase()+dir.substring(1);
var _3df=_3d1["center"];
var _3e0=(dir=="north"||dir=="south")?"minHeight":"minWidth";
var _3e1=(dir=="north"||dir=="south")?"maxHeight":"maxWidth";
var _3e2=(dir=="north"||dir=="south")?"_outerHeight":"_outerWidth";
var _3e3=$.parser.parseValue(_3e1,_3d1[dir].panel("options")[_3e1],$(_3cf));
var _3e4=$.parser.parseValue(_3e0,_3df.panel("options")[_3e0],$(_3cf));
var _3e5=_3df.panel("panel")[_3e2]()-_3e4;
if(_3c5(_3d1[_3de])){
_3e5+=_3d1[_3de][_3e2]()-1;
}else{
_3e5+=$(p)[_3e2]();
}
if(_3e5>_3e3){
_3e5=_3e3;
}
return _3e5;
};
}