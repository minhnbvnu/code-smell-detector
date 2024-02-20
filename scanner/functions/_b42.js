function _b42(_b43,q){
var _b44=$.data(_b43,"combobox");
var opts=_b44.options;
var _b45=$();
var qq=opts.multiple?q.split(opts.separator):[q];
if(opts.mode=="remote"){
_b46(qq);
_b3e(_b43,null,{q:q},true);
}else{
var _b47=$(_b43).combo("panel");
_b47.find(".combobox-item-hover").removeClass("combobox-item-hover");
_b47.find(".combobox-item,.combobox-group").hide();
var data=_b44.data;
var vv=[];
$.map(qq,function(q){
q=$.trim(q);
var _b48=q;
var _b49=undefined;
_b45=$();
for(var i=0;i<data.length;i++){
var row=data[i];
if(opts.filter.call(_b43,q,row)){
var v=row[opts.valueField];
var s=row[opts.textField];
var g=row[opts.groupField];
var item=opts.finder.getEl(_b43,v).show();
if(s.toLowerCase()==q.toLowerCase()){
_b48=v;
if(opts.reversed){
_b45=item;
}else{
_b27(_b43,v,true);
}
}
if(opts.groupField&&_b49!=g){
opts.finder.getGroupEl(_b43,g).show();
_b49=g;
}
}
}
vv.push(_b48);
});
_b46(vv);
}
function _b46(vv){
if(opts.reversed){
_b45.addClass("combobox-item-hover");
}else{
_b2c(_b43,opts.multiple?(q?vv:[]):vv,true);
}
};
}