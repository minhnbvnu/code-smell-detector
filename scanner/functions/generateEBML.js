function generateEBML(json, outputAsArray){
		var ebml = [];
		for(var i = 0; i < json.length; i++){
			if (!('id' in json[i])){
				//already encoded blob or byteArray
				ebml.push(json[i]);
				continue;
			}

			var data = json[i].data;
			if(typeof data == 'object') data = generateEBML(data, outputAsArray);
			if(typeof data == 'number') data = ('size' in json[i]) ? numToFixedBuffer(data, json[i].size) : bitsToBuffer(data.toString(2));
			if(typeof data == 'string') data = strToBuffer(data);

			if(data.length){
				var z = z;
			}

			var len = data.size || data.byteLength || data.length;
			var zeroes = Math.ceil(Math.ceil(Math.log(len)/Math.log(2))/8);
			var size_str = len.toString(2);
			var padded = (new Array((zeroes * 7 + 7 + 1) - size_str.length)).join('0') + size_str;
			var size = (new Array(zeroes)).join('0') + '1' + padded;

			//i actually dont quite understand what went on up there, so I'm not really
			//going to fix this, i'm probably just going to write some hacky thing which
			//converts that string into a buffer-esque thing

			ebml.push(numToBuffer(json[i].id));
			ebml.push(bitsToBuffer(size));
			ebml.push(data)


		}

		//output as blob or byteArray
		if(outputAsArray){
			//convert ebml to an array
			var buffer = toFlatArray(ebml)
			return new Uint8Array(buffer);
		}else{
			return new Blob(ebml, {type: "video/webm"});
		}
	}