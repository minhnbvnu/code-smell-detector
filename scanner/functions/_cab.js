function _cab(_ccc){
var opts=$.data(_ccc,"slider").options;
var fn=opts.onChange;
opts.onChange=function(){
};
_cc0(_ccc,opts.value);
opts.onChange=fn;
}