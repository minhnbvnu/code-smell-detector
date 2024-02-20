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
}