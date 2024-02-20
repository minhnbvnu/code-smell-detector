function _6d9(_6da,down){
var opts=$.data(_6da,"timespinner").options;
var s=$(_6da).timespinner("getValue");
var _6db=opts.selections[opts.highlight];
var s1=s.substring(0,_6db[0]);
var s2=s.substring(_6db[0],_6db[1]);
var s3=s.substring(_6db[1]);
if(s2==opts.ampm[0]){
s2=opts.ampm[1];
}else{
if(s2==opts.ampm[1]){
s2=opts.ampm[0];
}else{
s2=parseInt(s2,10)||0;
if(opts.selections.length-4==opts.highlight&&opts.hour12){
if(s2==12){
s2=0;
}else{
if(s2==11&&!down){
var tmp=s3.replace(opts.ampm[0],opts.ampm[1]);
if(s3!=tmp){
s3=tmp;
}else{
s3=s3.replace(opts.ampm[1],opts.ampm[0]);
}
}
}
}
s2=s2+opts.increment*(down?-1:1);
}
}
var v=s1+s2+s3;
$(_6da).timespinner("setValue",v);
_6d2(_6da);
}