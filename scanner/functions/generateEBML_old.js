function generateEBML_old(json){
		var ebml = '';
		for(var i = 0; i < json.length; i++){
			var data = json[i].data;
			if(typeof data == 'object') data = generateEBML_old(data);
			if(typeof data == 'number') data = toBinStr_old(data.toString(2));

			var len = data.length;
			var zeroes = Math.ceil(Math.ceil(Math.log(len)/Math.log(2))/8);
			var size_str = len.toString(2);
			var padded = (new Array((zeroes * 7 + 7 + 1) - size_str.length)).join('0') + size_str;
			var size = (new Array(zeroes)).join('0') + '1' + padded;

			ebml += toBinStr_old(json[i].id.toString(2)) + toBinStr_old(size) + data;

		}
		return ebml;
	}