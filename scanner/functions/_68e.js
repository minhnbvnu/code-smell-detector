function _68e(_68f,year,_690){
var opts=$.data(_68f,"calendar").options;
var _691=[];
var _692=new Date(year,_690,0).getDate();
for(var i=1;i<=_692;i++){
_691.push([year,_690,i]);
}
var _693=[],week=[];
var _694=-1;
while(_691.length>0){
var date=_691.shift();
week.push(date);
var day=new Date(date[0],date[1]-1,date[2]).getDay();
if(_694==day){
day=0;
}else{
if(day==(opts.firstDay==0?7:opts.firstDay)-1){
_693.push(week);
week=[];
}
}
_694=day;
}
if(week.length){
_693.push(week);
}
var _695=_693[0];
if(_695.length<7){
while(_695.length<7){
var _696=_695[0];
var date=new Date(_696[0],_696[1]-1,_696[2]-1);
_695.unshift([date.getFullYear(),date.getMonth()+1,date.getDate()]);
}
}else{
var _696=_695[0];
var week=[];
for(var i=1;i<=7;i++){
var date=new Date(_696[0],_696[1]-1,_696[2]-i);
week.unshift([date.getFullYear(),date.getMonth()+1,date.getDate()]);
}
_693.unshift(week);
}
var _697=_693[_693.length-1];
while(_697.length<7){
var _698=_697[_697.length-1];
var date=new Date(_698[0],_698[1]-1,_698[2]+1);
_697.push([date.getFullYear(),date.getMonth()+1,date.getDate()]);
}
if(_693.length<6){
var _698=_697[_697.length-1];
var week=[];
for(var i=1;i<=7;i++){
var date=new Date(_698[0],_698[1]-1,_698[2]+i);
week.push([date.getFullYear(),date.getMonth()+1,date.getDate()]);
}
_693.push(week);
}
return _693;
}