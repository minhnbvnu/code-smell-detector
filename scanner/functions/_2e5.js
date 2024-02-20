function _2e5(_2e6,_2e7,_2e8,all){
var _2e9=$.data(_2e6,"accordion").panels;
var pp=[];
for(var i=0;i<_2e9.length;i++){
var p=_2e9[i];
if(_2e7){
if(p.panel("options")[_2e7]==_2e8){
pp.push(p);
}
}else{
if(p[0]==$(_2e8)[0]){
return i;
}
}
}
if(_2e7){
return all?pp:(pp.length?pp[0]:null);
}else{
return -1;
}
}