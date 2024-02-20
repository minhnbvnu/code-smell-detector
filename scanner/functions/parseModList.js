function parseModList(data,extraInfo){
		var result = [];
		if (data){
			data.forEach(function(mod){
			    var info = formatFileSize(mod.size);
			    var title = mod.title || "---";
			    if (extraInfo){
                    title = mod[extraInfo] + ": " + title;
                }
				result.push({title:title,url:proxyUrl + mod.id,info:info,icon:mod.format});
			});
		}
		return result;
	}