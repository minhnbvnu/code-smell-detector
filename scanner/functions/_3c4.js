function _3c4(pp,type){
if(!pp.length||!_3c5(pp)){
return;
}
var opts=pp.panel("options");
pp.panel("resize",{width:cc.width(),height:opts.height});
var _3c7=pp.panel("panel").outerHeight();
pp.panel("move",{left:0,top:(type=="n"?0:cc.height()-_3c7)});
cpos.height-=_3c7;
if(type=="n"){
cpos.top+=_3c7;
if(!opts.split&&opts.border){
cpos.top--;
}
}
if(!opts.split&&opts.border){
cpos.height++;
}
}