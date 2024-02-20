function generateParamsList(data, prefix){
		var output = [];

		prefix = prefix || "";

		if(Array.isArray(data)){
			data.forEach((item, i) => {
				output = output.concat(generateParamsList(item, prefix ? prefix + "[" + i + "]" : i));
			});
		}else if (typeof data === "object"){
			for (var key in data){
				output = output.concat(generateParamsList(data[key], prefix ? prefix + "[" + key + "]" : key));
			}
		}else {
			output.push({key:prefix, value:data});
		}

		return output;
	}