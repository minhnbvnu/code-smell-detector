function traverseLang(trans, path){
				for(var prop in trans){
					if(typeof trans[prop] == "object"){
						if(!path[prop]){
							path[prop] = {};
						}
						traverseLang(trans[prop], path[prop]);
					}else {
						path[prop] = trans[prop];
					}
				}
			}