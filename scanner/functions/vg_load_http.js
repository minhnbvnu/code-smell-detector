function vg_load_http(url,callback){vg.log("LOAD HTTP: "+url);var req=require("http").request(url,function(res){var pos=0,data=new Buffer(parseInt(res.headers["content-length"],10));res.on("error",function(err){callback(err,null)});res.on("data",function(x){x.copy(data,pos);pos+=x.length});res.on("end",function(){callback(null,data)})});req.on("error",function(err){callback(err)});req.end()}