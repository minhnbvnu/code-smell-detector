function serializeParams(params){
		var output = generateParamsList(params),
		encoded = [];

		output.forEach(function(item){
			encoded.push(encodeURIComponent(item.key) + "=" + encodeURIComponent(item.value));
		});

		return encoded.join("&");
	}