function _b6a(el,_b6b){
var t=$(el);
var row={};
row[opts.valueField]=t.attr("value")!=undefined?t.attr("value"):t.text();
row[opts.textField]=t.text();
row["iconCls"]=$.parser.parseOptions(el,["iconCls"]).iconCls;
row["selected"]=t.is(":selected");
row["disabled"]=t.is(":disabled");
if(_b6b){
opts.groupField=opts.groupField||"group";
row[opts.groupField]=_b6b;
}
data.push(row);
}