function getPoC(par){
	var pocLink = $("#pocLink");
	var input = escape($("#input").val());
	var pocText = $("#pocText");

	if(par == "jsonp"){
		var jsonpUrl = "./poc/php/jsonp.php";
		var cValue = $("#cvalue").val();
		jsonpUrl += "?url=" + input + "&cvalue=" + cValue;
		HTTPRequest(pocText,jsonpUrl,0);
		pocLink.attr("href",jsonpUrl);
	}else if(par == "cors"){
		var corsUrl = null;
		var data = $("#data").val();
		var ct = $("#ct").val();
		if($('#gMethod:checked').val()){
			corsUrl = "./poc/php/cors_get.php?url=" + input;
		}else if($('#pMethod:checked').val()){
			corsUrl = "./poc/php/cors_post.php?url=" + input + "&data=" + data + "&ct=" + ct;
		}

		HTTPRequest(pocText,corsUrl,0);
		pocLink.attr("href",corsUrl);
	}else if(par == "googlehack"){
		googleHack(input,pocText);
	}else if(par == "searchengines"){
		searchengines(input,pocText);
	}else if(par == "urlredirect"){
		urlredirectUrl = "./poc/php/urlredirect.php?url=" + input;
		HTTPRequest(pocText,urlredirectUrl,1);
	}else if(par == "clickjacking"){
		var cjUrl = "./poc/php/clickjacking.php?url=";
		var height = $("#height").val();
		var width = $("#width").val();
		var top = $("#top").val();
		var left = $("#left").val();
		if($('#ishidden:checked').val()){
			cjUrl = cjUrl + input + "&height=" + height + "&width=" + width  + "&top=" + top  + "&left=" + left + "&ishidden=1";
		}else{
			cjUrl = cjUrl + input + "&height=" + height + "&width=" + width  + "&top=" + top  + "&left=" + left + "&ishidden=0";
		}
		HTTPRequest(pocText,cjUrl,0);
		pocLink.attr("href",cjUrl);
	}else if(par == "jsurl"){
		var jsUrl = "./poc/php/jsurl.php?url=";
		jsUrl += input;
		HTTPRequest(pocText,jsUrl,0);
		_url = window.location + jsUrl.replace("./","");
		pocLink.html("<b><a href='" + _url + "' target='_blank'>" + _url + "</a></b>");
	}else if(par == "302url"){
		var url302 = "./poc/php/302url.php?url=";
		url302 += input;
		_url = window.location + url302.replace("./","")
		pocLink.html("<b><a href='" + _url + "' target='_blank'>" + _url + "</a></b>");
	}else if(par == "cswsh"){
		var cswshUrl = null;
		var data = $("#data").val();
		if($('#http:checked').val()){
			cswshUrl = "./poc/php/cswsh.php?url=" + input + "&data=" + data + "&http=1";
		}else if($('#https:checked').val()){
			cswshUrl = "./poc/php/cswsh.php?url=" + input + "&data=" + data + "&http=0";
		}

		HTTPRequest(pocText,cswshUrl,0);
		pocLink.attr("href",cswshUrl);
	}else if(par == "upload"){
		var file = $("#file").val();
		uploadUrl = "./poc/php/uploadfile.php?url=" + input + "&file=" + file;
		HTTPRequest(pocText,uploadUrl,0);
		pocLink.attr("href",uploadUrl);
	}else if(par == "xxe"){
		var xxeUrl = "./poc/php/xxe.php?url=";
		xxeUrl += input;
		if($('#xls:checked').val()){
			xxeUrl += "&type=xls";
		}else if($('#xlsx:checked').val()){
			xxeUrl += "&type=xlsx";
		}else if($('#docx:checked').val()){
			xxeUrl += "&type=docx";
		}
		_url = window.location + xxeUrl
		pocLink.html("<b><a href='" + _url + "' target='_blank'>" + _url + "</a></b>");
	}
}