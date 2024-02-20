function _57b(_57c,_57d){
var _57e=$.data(_57c,"textbox");
var opts=_57e.options;
var tb=_57e.textbox;
var _57f=tb.parent();
if(_57d){
if(typeof _57d=="object"){
$.extend(opts,_57d);
}else{
opts.width=_57d;
}
}
if(isNaN(parseInt(opts.width))){
var c=$(_57c).clone();
c.css("visibility","hidden");
c.insertAfter(_57c);
opts.width=c.outerWidth();
c.remove();
}
var _580=tb.is(":visible");
if(!_580){
tb.appendTo("body");
}
var _581=tb.find(".textbox-text");
var btn=tb.find(".textbox-button");
var _582=tb.find(".textbox-addon");
var _583=_582.find(".textbox-icon");
if(opts.height=="auto"){
_581.css({margin:"",paddingTop:"",paddingBottom:"",height:"",lineHeight:""});
}
tb._size(opts,_57f);
if(opts.label&&opts.labelPosition){
if(opts.labelPosition=="top"){
_57e.label._size({width:opts.labelWidth=="auto"?tb.outerWidth():opts.labelWidth},tb);
if(opts.height!="auto"){
tb._size("height",tb.outerHeight()-_57e.label.outerHeight());
}
}else{
_57e.label._size({width:opts.labelWidth,height:tb.outerHeight()},tb);
if(!opts.multiline){
_57e.label.css("lineHeight",_57e.label.height()+"px");
}
tb._size("width",tb.outerWidth()-_57e.label.outerWidth());
}
}
if(opts.buttonAlign=="left"||opts.buttonAlign=="right"){
btn.linkbutton("resize",{height:tb.height()});
}else{
btn.linkbutton("resize",{width:"100%"});
}
var _584=tb.width()-_583.length*opts.iconWidth-_585("left")-_585("right");
var _586=opts.height=="auto"?_581.outerHeight():(tb.height()-_585("top")-_585("bottom"));
_582.css(opts.iconAlign,_585(opts.iconAlign)+"px");
_582.css("top",_585("top")+"px");
_583.css({width:opts.iconWidth+"px",height:_586+"px"});
_581.css({paddingLeft:(_57c.style.paddingLeft||""),paddingRight:(_57c.style.paddingRight||""),marginLeft:_587("left"),marginRight:_587("right"),marginTop:_585("top"),marginBottom:_585("bottom")});
if(opts.multiline){
_581.css({paddingTop:(_57c.style.paddingTop||""),paddingBottom:(_57c.style.paddingBottom||"")});
_581._outerHeight(_586);
}else{
_581.css({paddingTop:0,paddingBottom:0,height:_586+"px",lineHeight:_586+"px"});
}
_581._outerWidth(_584);
opts.onResizing.call(_57c,opts.width,opts.height);
if(!_580){
tb.insertAfter(_57c);
}
opts.onResize.call(_57c,opts.width,opts.height);
function _587(_588){
return (opts.iconAlign==_588?_582._outerWidth():0)+_585(_588);
};
function _585(_589){
var w=0;
btn.filter(".textbox-button-"+_589).each(function(){
if(_589=="left"||_589=="right"){
w+=$(this).outerWidth();
}else{
w+=$(this).outerHeight();
}
});
return w;
};
}