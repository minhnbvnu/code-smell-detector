function labelTraverse(path, data){
			var item = path.shift(),
			value = data[item];
			
			if(path.length && typeof value === "object"){
				return labelTraverse(path, value);
			}

			return value;
		}