function _9d2(_9d3){
var tr1=opts.finder.getTr(_9ce,_9d3,"body",1);
var tr2=opts.finder.getTr(_9ce,_9d3,"body",2);
tr1.css("height","");
tr2.css("height","");
var _9d4=Math.max(tr1.height(),tr2.height());
tr1.css("height",_9d4);
tr2.css("height",_9d4);
}