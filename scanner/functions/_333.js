function _333(_334){
var opts=$.data(_334,"tabs").options;
if(!opts.showHeader){
return;
}
var _335=$(_334).children("div.tabs-header");
var tool=_335.children("div.tabs-tool:not(.tabs-tool-hidden)");
var _336=_335.children("div.tabs-scroller-left");
var _337=_335.children("div.tabs-scroller-right");
var wrap=_335.children("div.tabs-wrap");
if(opts.tabPosition=="left"||opts.tabPosition=="right"){
if(!tool.length){
return;
}
tool._outerWidth(_335.width());
var _338={left:opts.tabPosition=="left"?"auto":0,right:opts.tabPosition=="left"?0:"auto",top:opts.toolPosition=="top"?0:"auto",bottom:opts.toolPosition=="top"?"auto":0};
var _339={marginTop:opts.toolPosition=="top"?tool.outerHeight():0};
tool.css(_338);
wrap.css(_339);
return;
}
var _33a=_335.outerHeight();
if(opts.plain){
_33a-=_33a-_335.height();
}
tool._outerHeight(_33a);
var _33b=_332(_335.find("ul.tabs"));
var _33c=_335.width()-tool._outerWidth();
if(_33b>_33c){
_336.add(_337).show()._outerHeight(_33a);
if(opts.toolPosition=="left"){
tool.css({left:_336.outerWidth(),right:""});
wrap.css({marginLeft:_336.outerWidth()+tool._outerWidth(),marginRight:_337._outerWidth(),width:_33c-_336.outerWidth()-_337.outerWidth()});
}else{
tool.css({left:"",right:_337.outerWidth()});
wrap.css({marginLeft:_336.outerWidth(),marginRight:_337.outerWidth()+tool._outerWidth(),width:_33c-_336.outerWidth()-_337.outerWidth()});
}
}else{
_336.add(_337).hide();
if(opts.toolPosition=="left"){
tool.css({left:0,right:""});
wrap.css({marginLeft:tool._outerWidth(),marginRight:0,width:_33c});
}else{
tool.css({left:"",right:0});
wrap.css({marginLeft:0,marginRight:tool._outerWidth(),width:_33c});
}
}
}