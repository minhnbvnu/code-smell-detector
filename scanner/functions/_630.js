function _630(_63b,_63c){
var opts=$.data(_63b,"form").options;
var _63d=new FormData($(_63b)[0]);
for(var name in _63c){
_63d.append(name,_63c[name]);
}
$.ajax({url:opts.url,type:"post",xhr:function(){
var xhr=$.ajaxSettings.xhr();
if(xhr.upload){
xhr.upload.addEventListener("progress",function(e){
if(e.lengthComputable){
var _63e=e.total;
var _63f=e.loaded||e.position;
var _640=Math.ceil(_63f*100/_63e);
opts.onProgress.call(_63b,_640);
}
},false);
}
return xhr;
},data:_63d,dataType:"html",cache:false,contentType:false,processData:false,complete:function(res){
opts.success.call(_63b,res.responseText);
}});
}