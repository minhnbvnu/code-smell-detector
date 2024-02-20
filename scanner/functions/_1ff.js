function _1ff(_200,e){
var _201=$.data(_200,"tooltip");
var opts=_201.options;
var tip=_201.tip;
if(!tip){
tip=$("<div tabindex=\"-1\" class=\"tooltip\">"+"<div class=\"tooltip-content\"></div>"+"<div class=\"tooltip-arrow-outer\"></div>"+"<div class=\"tooltip-arrow\"></div>"+"</div>").appendTo("body");
_201.tip=tip;
_202(_200);
}
_1f5(_200);
_201.showTimer=setTimeout(function(){
$(_200).tooltip("reposition");
tip.show();
opts.onShow.call(_200,e);
var _203=tip.children(".tooltip-arrow-outer");
var _204=tip.children(".tooltip-arrow");
var bc="border-"+opts.position+"-color";
_203.add(_204).css({borderTopColor:"",borderBottomColor:"",borderLeftColor:"",borderRightColor:""});
_203.css(bc,tip.css(bc));
_204.css(bc,tip.css("backgroundColor"));
},opts.showDelay);
}