function _303(_305,_306){
var p=_2f1(_305,_306);
if(!p){
return;
}
_307(_305);
var opts=$.data(_305,"accordion").options;
p.panel("expand",opts.animate);
}