function _430(_43c,menu){
var _43d=$.data(_43c,"menu");
var opts=_43d.options;
menu.unbind(".menu");
for(var _43e in opts.events){
menu.bind(_43e+".menu",{target:_43c},opts.events[_43e]);
}
}