function _2f1(_2f2,_2f3){
var _2f4=$.data(_2f2,"accordion").panels;
if(typeof _2f3=="number"){
if(_2f3<0||_2f3>=_2f4.length){
return null;
}else{
return _2f4[_2f3];
}
}
return _2e5(_2f2,"title",_2f3);
}