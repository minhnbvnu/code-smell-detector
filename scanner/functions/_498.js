function _498(_499,_49a){
var opts=$(_499).sidemenu("options");
opts.collapsed=_49a;
var acc=$(_499).find(".accordion");
var _49b=acc.accordion("panels");
acc.accordion("options").animate=false;
if(opts.collapsed){
$(_499).addClass("sidemenu-collapsed");
for(var i=0;i<_49b.length;i++){
var _49c=_49b[i];
if(_49c.panel("options").collapsed){
opts.data[i].state="closed";
}else{
opts.data[i].state="open";
acc.accordion("unselect",i);
}
var _49d=_49c.panel("header");
_49d.find(".panel-title").html("");
_49d.find(".panel-tool").hide();
}
}else{
$(_499).removeClass("sidemenu-collapsed");
for(var i=0;i<_49b.length;i++){
var _49c=_49b[i];
if(opts.data[i].state=="open"){
acc.accordion("select",i);
}
var _49d=_49c.panel("header");
_49d.find(".panel-title").html(_49c.panel("options").title);
_49d.find(".panel-tool").show();
}
}
acc.accordion("options").animate=opts.animate;
}