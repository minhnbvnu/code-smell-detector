function _3e6(_3e7,_3e8){
var _3e9=$.data(_3e7,"layout").panels;
if(_3e9[_3e8].length){
_3e9[_3e8].panel("destroy");
_3e9[_3e8]=$();
var _3ea="expand"+_3e8.substring(0,1).toUpperCase()+_3e8.substring(1);
if(_3e9[_3ea]){
_3e9[_3ea].panel("destroy");
_3e9[_3ea]=undefined;
}
$(_3e7).layout("options").onRemove.call(_3e7,_3e8);
}
}