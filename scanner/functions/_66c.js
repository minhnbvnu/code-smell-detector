function _66c(_66d,_66e){
var _66f=$.data(_66d,"numberbox");
var opts=_66f.options;
opts.value=parseFloat(_66e);
var _66e=opts.parser.call(_66d,_66e);
var text=opts.formatter.call(_66d,_66e);
opts.value=_66e;
$(_66d).textbox("setText",text).textbox("setValue",_66e);
text=opts.formatter.call(_66d,$(_66d).textbox("getValue"));
$(_66d).textbox("setText",text);
}