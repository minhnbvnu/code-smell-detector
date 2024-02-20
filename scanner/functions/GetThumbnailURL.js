function GetThumbnailURL(path,width,height){
    path =(typeof(path) != "string")? '/' : path;
    if (isNaN(width)){
	console.log('width is not number');
	return;
    }	
    if (typeof height == 'undefined'){
	height = pcsconf.height;
    }else{
	if (isNaN(height)){
	    console.log('height is not number');
	    return;
	}	
    }
    
    var param = {
	'method' : 'generate',
	'app_id' : pcsconf.app_id,
	'path' :  path,
	'width' : width,
	'height' : height
    };
    var querystring = query.stringify(param);
    var httpurl = 'http://' + 
	pcsconf.url + 
	pcsconf.path +
	'/' +
	'thumbnail?' + 
	querystring
    //console.log(httpsurl);
    return httpurl;
}