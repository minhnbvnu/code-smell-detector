function doubleToString(num){
		return [].slice.call(
			new Uint8Array(
				(
					new Float64Array([num]) //create a float64 array
				).buffer) //extract the array buffer
			, 0) // convert the Uint8Array into a regular array
			.map(function(e){ //since it's a regular array, we can now use map
				return String.fromCharCode(e) // encode all the bytes individually
			})
			.reverse() //correct the byte endianness (assume it's little endian for now)
			.join('') // join the bytes in holy matrimony as a string
	}