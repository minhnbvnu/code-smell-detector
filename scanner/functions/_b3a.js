function _b3a(_b3b,data,_b3c){
var _b3d=$.data(_b3b,"combobox");
var opts=_b3d.options;
_b3d.data=opts.loadFilter.call(_b3b,data);
opts.view.render.call(opts.view,_b3b,$(_b3b).combo("panel"),_b3d.data);
var vv=$(_b3b).combobox("getValues");
$.easyui.forEach(_b3d.data,false,function(row){
if(row["selected"]){
$.easyui.addArrayItem(vv,row[opts.valueField]+"");
}
});
if(opts.multiple){
_b2c(_b3b,vv,_b3c);
}else{
_b2c(_b3b,vv.length?[vv[vv.length-1]]:[],_b3c);
}
opts.onLoadSuccess.call(_b3b,data);
}