function _c8f(date){
function _c90(_c91){
return (_c91<10?"0":"")+_c91;
};
var tt=[_c90(date.getHours()),_c90(date.getMinutes())];
if(opts.showSeconds){
tt.push(_c90(date.getSeconds()));
}
return tt.join($(_c8c).datetimebox("spinner").timespinner("options").separator);
}