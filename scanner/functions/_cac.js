function _cac(_cad){
var _cae=$.data(_cad,"slider");
var opts=_cae.options;
var _caf=_cae.slider;
var aa=opts.mode=="h"?opts.rule:opts.rule.slice(0).reverse();
if(opts.reversed){
aa=aa.slice(0).reverse();
}
_cb0(aa);
function _cb0(aa){
var rule=_caf.find("div.slider-rule");
var _cb1=_caf.find("div.slider-rulelabel");
rule.empty();
_cb1.empty();
for(var i=0;i<aa.length;i++){
var _cb2=i*100/(aa.length-1)+"%";
var span=$("<span></span>").appendTo(rule);
span.css((opts.mode=="h"?"left":"top"),_cb2);
if(aa[i]!="|"){
span=$("<span></span>").appendTo(_cb1);
span.html(aa[i]);
if(opts.mode=="h"){
span.css({left:_cb2,marginLeft:-Math.round(span.outerWidth()/2)});
}else{
span.css({top:_cb2,marginTop:-Math.round(span.outerHeight()/2)});
}
}
}
};
}