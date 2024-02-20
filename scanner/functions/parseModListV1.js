function parseModListV1(data,base){

		var result = [];
		if (data){

			if (data.module){
				var mods = data.module;
				if (mods.forEach){
					mods.forEach(function(mod){
						result.push({title:mod.songtitle || "---",url:mod.url,icon:"mod"});
					});
				}else{
					// single result
					result.push({title:mods.songtitle || "---",url:mods.url,icon:"mod"});
				}
			}

			if (data.totalpages){
				var pageCount = parseInt(data.totalpages);
				if (pageCount>1){
					var profile = base[0] + "/";
					var currentPage = parseInt(base[1] || 1);
					if (isNaN(currentPage)) currentPage=1;

					if (profile == "artist/" || profile == "genre/"){
						profile += base[1] + "/";
						currentPage = parseInt(base[2] || 1);
						if (isNaN(currentPage)) currentPage=1;
					}
					if (pageCount>currentPage){
						profile += (currentPage+1);
						result.push({title:"... load more ...",children:[],url:profile});
					}

				}
			}

		}
		return result;
	}